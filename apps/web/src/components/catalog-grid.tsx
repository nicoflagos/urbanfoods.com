"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";

type ApiProduct = { _id: string; name: string; price: number; unit?: string };

const fallback: ApiProduct[] = [
  { _id: "fallback-1", name: "Custard powder", price: 3500, unit: "pack" },
  { _id: "fallback-2", name: "Instant fat milk", price: 12500, unit: "bag" },
  { _id: "fallback-3", name: "Koffa grains", price: 9200, unit: "bag" },
  { _id: "fallback-4", name: "Tantalizer flavour", price: 2100, unit: "bottle" }
];

export function CatalogGrid() {
  const [products, setProducts] = useState<ApiProduct[] | null>(null);
  useEffect(() => {
    api.catalog
      .products()
      .then((data) => setProducts(data))
      .catch(() => setProducts(fallback));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {(products ?? fallback).map((p) => (
        <ProductCard
          key={p._id}
          name={p.name}
          price={p.price}
          unit={p.unit}
          category="General"
        />
      ))}
    </div>
  );
}
