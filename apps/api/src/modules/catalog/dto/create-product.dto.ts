import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  categoryId!: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}

