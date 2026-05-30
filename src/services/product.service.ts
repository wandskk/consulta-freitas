import type { ProductRepository } from "@/repositories/product.repository";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAll() {
    return this.productRepository.findAll();
  }
}
