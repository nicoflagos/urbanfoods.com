import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ type: Types.ObjectId, ref: "Product", required: true, unique: true })
  productId!: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  currentStock!: number;

  @Prop({ required: true, default: 0 })
  reservedStock!: number;

  @Prop({ required: true, default: 0 })
  reorderLevel!: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
InventorySchema.index({ productId: 1 }, { unique: true });

