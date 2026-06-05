"use client";

import Link from "next/link";
import { getAccessToken, hasAnyRole } from "@/lib/auth";

const ADMIN_ROLES = ["SUPER_ADMIN", "SALES_MANAGER", "INVENTORY_OFFICER", "CUSTOMER_SUPPORT"] as const;

export function SiteHeader() {
  const token = getAccessToken();
  const showAdmin = token ? hasAnyRole(token, [...ADMIN_ROLES]) : false;

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          UrbanFoods
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/catalog" className="hover:underline">
            Catalog
          </Link>
          <Link href="/account/orders" className="hover:underline">
            My orders
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          {showAdmin ? (
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
