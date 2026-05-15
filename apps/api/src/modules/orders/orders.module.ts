import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { env } from "../../config/env.js";
import { OrdersController } from "./orders.controller.js";
import { OrdersService } from "./orders.service.js";
import { Order, OrderSchema } from "./schemas/order.schema.js";
import { Product, ProductSchema } from "../catalog/schemas/product.schema.js";
import { InventoryModule } from "../inventory/inventory.module.js";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema }
    ]),
    InventoryModule,
    JwtModule.register({ secret: env.JWT_SECRET })
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}

