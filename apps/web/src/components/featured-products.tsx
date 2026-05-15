import { ProductCard } from "@/components/product-card";

const featured = [
  { name: "Custard powder", price: 3500, unit: "pack", category: "Beverage" },
  { name: "Instant fat milk", price: 12500, unit: "bag", category: "Dairy" },
  { name: "Koffa grains", price: 9200, unit: "bag", category: "Grains" },
  { name: "Tantalizer flavour", price: 2100, unit: "bottle", category: "Beverage" }
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {featured.map((p) => (
        <ProductCard
          key={p.name}
          name={p.name}
          price={p.price}
          unit={p.unit}
          category={p.category}
        />
      ))}
    </div>
  );
}

