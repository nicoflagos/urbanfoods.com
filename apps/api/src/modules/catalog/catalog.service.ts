import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Category } from "./schemas/category.schema.js";
import { Product } from "./schemas/product.schema.js";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Category.name) private readonly categories: Model<Category>,
    @InjectModel(Product.name) private readonly products: Model<Product>
  ) {}

  listCategories() {
    return this.categories.find({}).sort({ name: 1 }).exec();
  }

  async createCategory(name: string) {
    const slug = slugify(name);
    return this.categories.create({ name, slug });
  }

  listProducts(input: { search?: string; categorySlug?: string }) {
    const filter: Record<string, unknown> = { isActive: true };
    if (input.search) filter.$text = { $search: input.search };
    return this.products.find(filter).limit(100).exec();
  }

  async createProduct(input: {
    name: string;
    categoryId: string;
    price: number;
    unit?: string;
    images?: string[];
  }) {
    const slug = slugify(input.name);
    return this.products.create({
      name: input.name,
      slug,
      categoryId: input.categoryId,
      price: input.price,
      unit: input.unit,
      images: input.images ?? [],
      isActive: true
    });
  }
}

