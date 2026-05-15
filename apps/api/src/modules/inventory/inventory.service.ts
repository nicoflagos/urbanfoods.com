import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Inventory } from "./schemas/inventory.schema.js";

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Inventory.name) private readonly inventories: Model<Inventory>) {}

  findByProductId(productId: string) {
    return this.inventories.findOne({ productId }).exec();
  }

  async setStock(productId: string, currentStock: number, reorderLevel: number) {
    if (currentStock < 0) throw new BadRequestException("currentStock must be >= 0");
    if (reorderLevel < 0) throw new BadRequestException("reorderLevel must be >= 0");
    return this.inventories
      .findOneAndUpdate(
        { productId },
        { $set: { productId, currentStock, reorderLevel }, $setOnInsert: { reservedStock: 0 } },
        { upsert: true, new: true }
      )
      .exec();
  }

  async reserve(productId: string, quantity: number) {
    if (quantity <= 0) throw new BadRequestException("quantity must be > 0");
    const inv = await this.inventories
      .findOneAndUpdate(
        { productId, $expr: { $gte: [{ $subtract: ["$currentStock", "$reservedStock"] }, quantity] } },
        { $inc: { reservedStock: quantity } },
        { new: true }
      )
      .exec();
    if (!inv) throw new BadRequestException("Insufficient stock");
    return inv;
  }

  async releaseReservation(productId: string, quantity: number) {
    if (quantity <= 0) throw new BadRequestException("quantity must be > 0");
    return this.inventories
      .findOneAndUpdate(
        { productId, $expr: { $gte: ["$reservedStock", quantity] } },
        { $inc: { reservedStock: -quantity } },
        { new: true }
      )
      .exec();
  }
}

