export default function AdminHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Admin (MVP)</h1>
      <p className="text-sm text-neutral-600">
        Connect this dashboard to API admin endpoints (orders, KYC, inventory).
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <a className="rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50" href="/admin/orders">
          Orders
        </a>
        <a className="rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50" href="/admin/kyc">
          KYC
        </a>
        <a className="rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50" href="/admin/products">
          Products
        </a>
      </div>
    </div>
  );
}

