import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { KycRecord } from "./schemas/kyc-record.schema.js";
import { User } from "../users/schemas/user.schema.js";
import type { KycStatus } from "@urbanfoods/shared";

@Injectable()
export class KycService {
  constructor(
    @InjectModel(KycRecord.name) private readonly kycs: Model<KycRecord>,
    @InjectModel(User.name) private readonly users: Model<User>
  ) {}

  getForUser(userId: string) {
    return this.kycs.findOne({ userId }).exec();
  }

  async submit(userId: string, input: { customerType: "INDIVIDUAL" | "BUSINESS"; payload: Record<string, unknown>; documents: string[] }) {
    const record = await this.kycs
      .findOneAndUpdate(
        { userId },
        { $set: { userId, customerType: input.customerType, payload: input.payload, documents: input.documents, status: "PENDING" } },
        { upsert: true, new: true }
      )
      .exec();
    await this.users.findByIdAndUpdate(userId, { $set: { kycStatus: "PENDING" } }).exec();
    return record;
  }

  listAll() {
    return this.kycs.find({}).sort({ updatedAt: -1 }).limit(200).exec();
  }

  async review(userId: string, status: KycStatus, rejectionReason?: string) {
    if (status === "REJECTED" && !rejectionReason) {
      throw new BadRequestException("rejectionReason is required when rejecting");
    }
    const record = await this.kycs
      .findOneAndUpdate(
        { userId },
        { $set: { status, rejectionReason: status === "REJECTED" ? rejectionReason : undefined } },
        { new: true }
      )
      .exec();
    if (!record) throw new BadRequestException("KYC record not found");
    await this.users.findByIdAndUpdate(userId, { $set: { kycStatus: status } }).exec();
    return record;
  }
}

