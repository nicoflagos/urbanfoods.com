import { z } from "zod";

export const RoleCodeSchema = z.enum([
  "SUPER_ADMIN",
  "INVENTORY_OFFICER",
  "SALES_MANAGER",
  "CUSTOMER_SUPPORT",
  "LOGISTICS_OFFICER",
  "CUSTOMER"
]);

export const KycStatusSchema = z.enum([
  "PENDING",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED"
]);

export const OrderStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "PACKAGED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED"
]);

