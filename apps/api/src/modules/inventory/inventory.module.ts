import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { env } from "../../config/env.js";
import { Inventory, InventorySchema } from "./schemas/inventory.schema.js";
import { InventoryService } from "./inventory.service.js";
import { InventoryController } from "./inventory.controller.js";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
    JwtModule.register({ secret: env.JWT_SECRET })
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService]
})
export class InventoryModule {}

