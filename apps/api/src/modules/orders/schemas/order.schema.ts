import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import type { OrderStatus } from "@urbanfoods/shared";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  productId!: Types.ObjectId;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: Number, required: true })
  unitPrice!: number;

  @Prop({ type: Number, required: true })
  quantity!: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId!: Types.ObjectId;

  @Prop({ type: [OrderItemSchema], required: true })
  items!: OrderItem[];

  @Prop({ type: Number, required: true })
  total!: number;

  @Prop({ type: String, required: true, default: "PENDING" })
  status!: OrderStatus;

  @Prop({ type: String, required: true })
  deliveryAddress!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
