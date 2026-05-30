import type { Product } from "@/types/product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
}
