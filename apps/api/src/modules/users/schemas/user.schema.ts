import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import type { KycStatus, RoleCode } from "@urbanfoods/shared";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ type: [String], required: true, default: ["CUSTOMER"] })
  roles!: RoleCode[];

  @Prop({ required: true, default: "PENDING" })
  kycStatus!: KycStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });

