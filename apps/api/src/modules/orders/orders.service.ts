import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Order } from "./schemas/order.schema.js";
import { Product } from "../catalog/schemas/product.schema.js";
import { InventoryService } from "../inventory/inventory.service.js";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orders: Model<Order>,
    @InjectModel(Product.name) private readonly products: Model<Product>,
    private readonly inventory: InventoryService
  ) {}

  listForUser(userId: string) {
    return this.orders.find({ userId }).sort({ createdAt: -1 }).limit(50).exec();
  }

  listAll() {
    return this.orders.find({}).sort({ createdAt: -1 }).limit(200).exec();
  }

  async createOrder(input: { userId: string; items: { productId: string; quantity: number }[]; deliveryAddress: string }) {
    if (input.items.length === 0) throw new BadRequestException("No items");

    const products = await this.products
      .find({ _id: { $in: input.items.map((i) => i.productId) }, isActive: true })
      .exec();

    if (products.length !== input.items.length) throw new BadRequestException("Invalid product in cart");

    // Reserve stock first (sequential; on failure, release prior reservations)
    const reserved: Array<{ productId: string; quantity: number }> = [];
    try {
      for (const item of input.items) {
        await this.inventory.reserve(item.productId, item.quantity);
        reserved.push(item);
      }
    } catch (err) {
      await Promise.all(
        reserved.map((r) => this.inventory.releaseReservation(r.productId, r.quantity).catch(() => null))
      );
      throw err;
    }

    const itemsSnapshot = input.items.map((i) => {
      const p = products.find((x) => x.id === i.productId)!;
      return { productId: p._id, name: p.name, unitPrice: p.price, quantity: i.quantity };
    });

    const total = itemsSnapshot.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const order = await this.orders.create({
      userId: input.userId,
      items: itemsSnapshot,
      total,
      status: "PENDING",
      deliveryAddress: input.deliveryAddress
    });
    return order;
  }
}
