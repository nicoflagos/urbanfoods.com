export function ProductCard(props: {
  name: string;
  price: number;
  unit?: string;
  category?: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="aspect-[4/3] w-full rounded-lg bg-neutral-100" />
      <div className="mt-3 space-y-1">
        <div className="text-sm text-neutral-600">{props.category ?? "General"}</div>
        <div className="font-medium">{props.name}</div>
        <div className="text-sm text-neutral-800">
          ₦{props.price.toLocaleString()}{" "}
          {props.unit ? <span className="text-neutral-500">/ {props.unit}</span> : null}
        </div>
      </div>
      <button className="mt-3 w-full rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:opacity-95">
        Add to cart
      </button>
    </div>
  );
}

