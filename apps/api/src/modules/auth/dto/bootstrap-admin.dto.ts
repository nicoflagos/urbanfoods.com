import { IsEmail, IsString, MinLength } from "class-validator";

export class BootstrapAdminDto {
  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

