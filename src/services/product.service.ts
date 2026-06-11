import { PRODUCT_SEARCH_LIMIT } from '@/constants/product.constants'
import type { ProductRepository } from '@/repositories/product.repository'
import type { Product, ProductSearchParams } from '@/types/product'

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async searchProducts(params: ProductSearchParams): Promise<Product[]> {
    const search = params.search.trim()

    if (!search) {
      return []
    }

    const limit = this.normalizeLimit(params.limit)

    return this.productRepository.findMany({
      search,
      searchField: params.searchField,
      limit,
    })
  }

  private normalizeLimit(limit?: number): number {
    if (!limit) {
      return PRODUCT_SEARCH_LIMIT
    }

    if (limit <= 0) {
      return PRODUCT_SEARCH_LIMIT
    }

    if (limit > PRODUCT_SEARCH_LIMIT) {
      return PRODUCT_SEARCH_LIMIT
    }

    return limit
  }
}
