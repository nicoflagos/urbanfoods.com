import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import type { OrderStatus } from "@urbanfoods/shared";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  productId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  unitPrice!: number;

  @Prop({ required: true })
  quantity!: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId!: Types.ObjectId;

  @Prop({ type: [OrderItem], required: true })
  items!: OrderItem[];

  @Prop({ required: true })
  total!: number;

  @Prop({ required: true, default: "PENDING" })
  status!: OrderStatus;

  @Prop({ required: true })
  deliveryAddress!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

