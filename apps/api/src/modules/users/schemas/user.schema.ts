import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import type { KycStatus, RoleCode } from "@urbanfoods/shared";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ type: String, required: true, trim: true })
  phone!: string;

  @Prop({ type: String, required: true })
  passwordHash!: string;

  @Prop({ type: [String], required: true, default: ["CUSTOMER"] })
  roles!: RoleCode[];

  @Prop({ type: String, required: true, default: "PENDING" })
  kycStatus!: KycStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
