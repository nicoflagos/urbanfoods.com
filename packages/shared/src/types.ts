export type RoleCode =
  | "SUPER_ADMIN"
  | "INVENTORY_OFFICER"
  | "SALES_MANAGER"
  | "CUSTOMER_SUPPORT"
  | "LOGISTICS_OFFICER"
  | "CUSTOMER";

export type KycStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "PACKAGED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

