import { IsArray, IsIn, IsObject, IsOptional, IsString } from "class-validator";

export class SubmitKycDto {
  @IsIn(["INDIVIDUAL", "BUSINESS"])
  customerType!: "INDIVIDUAL" | "BUSINESS";

  @IsObject()
  payload!: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  documents?: string[];
}

