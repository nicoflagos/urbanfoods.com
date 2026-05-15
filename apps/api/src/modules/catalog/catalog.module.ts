import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { env } from "../../config/env.js";
import { CatalogController } from "./catalog.controller.js";
import { CatalogService } from "./catalog.service.js";
import { Category, CategorySchema } from "./schemas/category.schema.js";
import { Product, ProductSchema } from "./schemas/product.schema.js";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema }
    ]),
    JwtModule.register({ secret: env.JWT_SECRET })
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService, MongooseModule]
})
export class CatalogModule {}

