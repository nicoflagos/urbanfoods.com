import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CatalogService } from "./catalog.service.js";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { JwtAuthGuard } from "../../common/auth/jwt-auth.guard.js";
import { RolesGuard } from "../../common/auth/roles.guard.js";
import { Roles } from "../../common/auth/roles.decorator.js";

@Controller("/catalog")
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get("/categories")
  categories() {
    return this.catalog.listCategories();
  }

  @Get("/products")
  products(@Query("search") search?: string) {
    return this.catalog.listProducts({ search });
  }

  @Post("/categories")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.catalog.createCategory(dto.name);
  }

  @Post("/products")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  createProduct(@Body() dto: CreateProductDto) {
    return this.catalog.createProduct(dto);
  }
}

