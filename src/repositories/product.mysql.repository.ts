import { createMySqlConnection } from "@/lib/mysql";
import type { ProductRepository } from "@/repositories/product.repository";
import type { Product } from "@/types/product";

export class ProductMySqlRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const connection = await createMySqlConnection();
    const [rows] = await connection.execute("SELECT * FROM products");

    await connection.end();

    return rows as Product[];
  }
}
