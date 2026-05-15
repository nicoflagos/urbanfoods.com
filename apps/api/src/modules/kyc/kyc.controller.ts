import { BadRequestException, Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, type AuthUser } from "../../common/auth/jwt-auth.guard.js";
import { RolesGuard } from "../../common/auth/roles.guard.js";
import { Roles } from "../../common/auth/roles.decorator.js";
import { SubmitKycDto } from "./dto/submit-kyc.dto.js";
import { ReviewKycDto } from "./dto/review-kyc.dto.js";
import { KycService } from "./kyc.service.js";

@Controller("/kyc")
export class KycController {
  constructor(private readonly kyc: KycService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMine(@Req() req: { user: AuthUser }) {
    return this.kyc.getForUser(req.user.sub);
  }

  @Patch("/submit")
  @UseGuards(JwtAuthGuard)
  submit(@Req() req: { user: AuthUser }, @Body() dto: SubmitKycDto) {
    return this.kyc.submit(req.user.sub, {
      customerType: dto.customerType,
      payload: dto.payload,
      documents: dto.documents ?? []
    });
  }

  @Get("/admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "CUSTOMER_SUPPORT")
  listAll() {
    return this.kyc.listAll();
  }

  @Patch("/admin/review")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "CUSTOMER_SUPPORT")
  review(@Body() dto: ReviewKycDto) {
    if (!dto.userId) throw new BadRequestException("Missing userId");
    return this.kyc.review(dto.userId, dto.status, dto.rejectionReason);
  }
}
