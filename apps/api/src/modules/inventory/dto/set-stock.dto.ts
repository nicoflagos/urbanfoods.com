import { IsNumber, IsString, Min } from "class-validator";

export class SetStockDto {
  @IsString()
  productId!: string;

  @IsNumber()
  @Min(0)
  currentStock!: number;

  @IsNumber()
  @Min(0)
  reorderLevel!: number;
}

