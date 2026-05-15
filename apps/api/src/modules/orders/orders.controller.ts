import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, type AuthUser } from "../../common/auth/jwt-auth.guard.js";
import { OrdersService } from "./orders.service.js";
import { CreateOrderDto } from "./dto/create-order.dto.js";
import { RolesGuard } from "../../common/auth/roles.guard.js";
import { Roles } from "../../common/auth/roles.decorator.js";

@Controller("/orders")
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  listMine(@Req() req: { user: AuthUser }) {
    return this.orders.listForUser(req.user.sub);
  }

  @Get("/admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "SALES_MANAGER")
  listAll() {
    return this.orders.listAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: { user: AuthUser }, @Body() dto: CreateOrderDto) {
    return this.orders.createOrder({
      userId: req.user.sub,
      items: dto.items,
      deliveryAddress: dto.deliveryAddress
    });
  }
}

