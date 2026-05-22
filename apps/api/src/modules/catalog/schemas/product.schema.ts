import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true, trim: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ type: Types.ObjectId, ref: "Category", required: true })
  categoryId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  price!: number;

  @Prop({ type: String, trim: true })
  unit?: string;

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({ type: Boolean, required: true, default: true })
  isActive!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ name: "text" });
