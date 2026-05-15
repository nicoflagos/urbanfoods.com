import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { User } from "./schemas/user.schema.js";
import type { RoleCode } from "@urbanfoods/shared";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly users: Model<User>) {}

  findByEmail(email: string) {
    return this.users.findOne({ email: email.toLowerCase() }).exec();
  }

  findById(id: string) {
    return this.users.findById(id).exec();
  }

  async create(input: { email: string; phone: string; passwordHash: string; roles?: RoleCode[] }) {
    const user = await this.users.create({
      email: input.email.toLowerCase(),
      phone: input.phone,
      passwordHash: input.passwordHash,
      roles: input.roles ?? ["CUSTOMER"]
    });
    return user;
  }
}

