import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthModule } from "./modules/health/health.module.js";
import { env } from "./config/env.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { UsersModule } from "./modules/users/users.module.js";
import { CatalogModule } from "./modules/catalog/catalog.module.js";
import { InventoryModule } from "./modules/inventory/inventory.module.js";
import { OrdersModule } from "./modules/orders/orders.module.js";
import { KycModule } from "./modules/kyc/kyc.module.js";

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGODB_URI),
    HealthModule,
    AuthModule,
    UsersModule,
    CatalogModule,
    InventoryModule,
    OrdersModule,
    KycModule
  ]
})
export class AppModule {}
