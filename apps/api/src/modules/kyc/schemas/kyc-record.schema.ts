import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import type { KycStatus } from "@urbanfoods/shared";

export type KycRecordDocument = HydratedDocument<KycRecord>;

@Schema({ timestamps: true })
export class KycRecord {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId!: Types.ObjectId;

  @Prop({ type: String, required: true })
  customerType!: "INDIVIDUAL" | "BUSINESS";

  @Prop({ type: Object, required: true })
  payload!: Record<string, unknown>;

  @Prop({ type: [String], default: [] })
  documents!: string[];

  @Prop({ type: String, required: true, default: "PENDING" })
  status!: KycStatus;

  @Prop({ type: String })
  rejectionReason?: string;
}

export const KycRecordSchema = SchemaFactory.createForClass(KycRecord);
