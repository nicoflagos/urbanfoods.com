"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    api.orders
      .mine(token)
      .then((data) => setOrders(data as any[]))
      .catch(() => setError("Failed to load orders."));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">My orders</h1>
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      {!orders ? (
        <div className="text-sm text-neutral-600">Loading…</div>
      ) : orders.length === 0 ? (
        <div className="text-sm text-neutral-600">No orders yet.</div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="rounded-xl border border-neutral-200 p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Order #{String(o._id).slice(-6)}</div>
                <div className="text-sm text-neutral-600">{o.status}</div>
              </div>
              <div className="mt-2 text-sm text-neutral-700">
                Total: ₦{Number(o.total ?? 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

