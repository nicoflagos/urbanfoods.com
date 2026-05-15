import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/auth/jwt-auth.guard.js";
import { RolesGuard } from "../../common/auth/roles.guard.js";
import { Roles } from "../../common/auth/roles.decorator.js";
import { InventoryService } from "./inventory.service.js";
import { SetStockDto } from "./dto/set-stock.dto.js";

@Controller("/inventory")
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Post("/set-stock")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "INVENTORY_OFFICER")
  setStock(@Body() dto: SetStockDto) {
    return this.inventory.setStock(dto.productId, dto.currentStock, dto.reorderLevel);
  }
}

