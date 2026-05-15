import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { env } from "../../config/env.js";
import { KycController } from "./kyc.controller.js";
import { KycService } from "./kyc.service.js";
import { KycRecord, KycRecordSchema } from "./schemas/kyc-record.schema.js";
import { User, UserSchema } from "../users/schemas/user.schema.js";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KycRecord.name, schema: KycRecordSchema },
      { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({ secret: env.JWT_SECRET })
  ],
  controllers: [KycController],
  providers: [KycService]
})
export class KycModule {}

