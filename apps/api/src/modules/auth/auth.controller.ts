import { BadRequestException, Body, Controller, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
import { BootstrapAdminDto } from "./dto/bootstrap-admin.dto.js";
import { env } from "../../config/env.js";

@Controller("/auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("/register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post("/bootstrap-admin")
  bootstrapAdmin(@Headers("x-bootstrap-token") token: string | undefined, @Body() dto: BootstrapAdminDto) {
    if (!env.BOOTSTRAP_TOKEN) throw new BadRequestException("BOOTSTRAP_TOKEN is not configured");
    if (token !== env.BOOTSTRAP_TOKEN) throw new BadRequestException("Invalid bootstrap token");
    return this.auth.bootstrapAdmin(dto);
  }
}
