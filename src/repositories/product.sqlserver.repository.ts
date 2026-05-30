import { getSqlServerConfig } from "@/lib/sqlserver";
import type { ProductRepository } from "@/repositories/product.repository";
import type { Product } from "@/types/product";

export class ProductSqlServerRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    getSqlServerConfig();

    return [];
  }
}
