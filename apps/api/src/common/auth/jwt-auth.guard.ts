import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { env } from "../../config/env.js";
import type { RoleCode } from "@urbanfoods/shared";

export type AuthUser = { sub: string; email: string; roles: RoleCode[] };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as {
      headers: Record<string, string | string[] | undefined>;
      user?: AuthUser;
    };
    const header = req.headers["authorization"];
    const value = Array.isArray(header) ? header[0] : header;
    if (!value?.startsWith("Bearer ")) throw new UnauthorizedException("Missing bearer token");
    const token = value.slice("Bearer ".length);
    try {
      const payload = this.jwt.verify<AuthUser>(token, { secret: env.JWT_SECRET });
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}

