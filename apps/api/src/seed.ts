import "dotenv/config";
import "reflect-metadata";
import mongoose from "mongoose";
import { env } from "./config/env.js";

async function main() {
  await mongoose.connect(env.MONGODB_URI);

  const Category = mongoose.model(
    "Category",
    new mongoose.Schema(
      { name: { type: String, required: true }, slug: { type: String, required: true, unique: true } },
      { timestamps: true }
    )
  );

  const Product = mongoose.model(
    "Product",
    new mongoose.Schema(
      {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
        price: { type: Number, required: true },
        unit: { type: String },
        images: { type: [String], default: [] },
        isActive: { type: Boolean, default: true }
      },
      { timestamps: true }
    )
  );

  const Inventory = mongoose.model(
    "Inventory",
    new mongoose.Schema(
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
        currentStock: { type: Number, default: 0 },
        reservedStock: { type: Number, default: 0 },
        reorderLevel: { type: Number, default: 0 }
      },
      { timestamps: true }
    )
  );

  const existing = await Product.countDocuments({});
  if (existing > 0) {
    // eslint-disable-next-line no-console
    console.log("Seed skipped: products already exist.");
    await mongoose.disconnect();
    return;
  }

  const categories = await Category.insertMany([
    { name: "Beverage", slug: "beverage" },
    { name: "Grains", slug: "grains" },
    { name: "Dairy", slug: "dairy" }
  ]);

  const bySlug = new Map(categories.map((c: any) => [c.slug, c._id]));

  const products = await Product.insertMany([
    { name: "Custard powder", slug: "custard-powder", categoryId: bySlug.get("beverage"), price: 3500, unit: "pack" },
    { name: "Instant fat milk", slug: "instant-fat-milk", categoryId: bySlug.get("dairy"), price: 12500, unit: "bag" },
    { name: "Koffa grains", slug: "koffa-grains", categoryId: bySlug.get("grains"), price: 9200, unit: "bag" },
    { name: "Tantalizer flavour", slug: "tantalizer-flavour", categoryId: bySlug.get("beverage"), price: 2100, unit: "bottle" }
  ]);

  await Inventory.insertMany(
    products.map((p: any) => ({
      productId: p._id,
      currentStock: 100,
      reservedStock: 0,
      reorderLevel: 10
    }))
  );

  // eslint-disable-next-line no-console
  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
