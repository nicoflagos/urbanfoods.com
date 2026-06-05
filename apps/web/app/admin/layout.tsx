"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, hasAnyRole } from "@/lib/auth";

const ADMIN_ROLES = ["SUPER_ADMIN", "SALES_MANAGER", "INVENTORY_OFFICER", "CUSTOMER_SUPPORT"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setAllowed(false);
      router.replace("/login");
      return;
    }

    if (!hasAnyRole(token, ADMIN_ROLES)) {
      setAllowed(false);
      router.replace("/");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (allowed !== true) return null;
  return <>{children}</>;
}

