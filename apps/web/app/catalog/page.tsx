import { CatalogGrid } from "@/components/catalog-grid";

export default function CatalogPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Catalog</h1>
          <p className="text-sm text-neutral-600">
            Browse categories and add items to cart.
          </p>
        </div>
      </div>
      <CatalogGrid />
    </div>
  );
}

