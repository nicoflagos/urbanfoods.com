import { IsIn, IsOptional, IsString } from "class-validator";
import type { KycStatus } from "@urbanfoods/shared";

export class ReviewKycDto {
  @IsString()
  userId!: string;

  @IsIn(["UNDER_REVIEW", "APPROVED", "REJECTED"])
  status!: Extract<KycStatus, "UNDER_REVIEW" | "APPROVED" | "REJECTED">;

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
