import { FeaturedProducts } from "@/components/featured-products";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 p-8 text-white">
        <h1 className="text-3xl font-semibold tracking-tight">
          Fresh supplies for homes and businesses
        </h1>
        <p className="mt-2 max-w-2xl text-white/90">
          Order ingredients and food products, track deliveries, and manage your account in
          one place.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Featured products</h2>
          <a className="text-sm text-brand-500 hover:underline" href="/catalog">
            View all
          </a>
        </div>
        <FeaturedProducts />
      </section>
    </div>
  );
}

