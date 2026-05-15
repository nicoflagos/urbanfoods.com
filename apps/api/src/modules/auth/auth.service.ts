import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service.js";
import { env } from "../../config/env.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService
  ) {}

  async register(input: { email: string; phone: string; password: string }) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) throw new UnauthorizedException("Email already in use");
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.users.create({
      email: input.email,
      phone: input.phone,
      passwordHash,
      roles: ["CUSTOMER"]
    });
    return this.issueTokens(user.id, user.email, user.roles);
  }

  async login(input: { email: string; password: string }) {
    const user = await this.users.findByEmail(input.email);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");
    return this.issueTokens(user.id, user.email, user.roles);
  }

  issueTokens(userId: string, email: string, roles: string[]) {
    const accessToken = this.jwt.sign(
      { sub: userId, email, roles },
      { secret: env.JWT_SECRET, expiresIn: "15m" }
    );
    return { accessToken };
  }

  async bootstrapAdmin(input: { email: string; phone: string; password: string }) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) return this.issueTokens(existing.id, existing.email, existing.roles);
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.users.create({
      email: input.email,
      phone: input.phone,
      passwordHash,
      roles: ["SUPER_ADMIN"]
    });
    return this.issueTokens(user.id, user.email, user.roles);
  }
}
