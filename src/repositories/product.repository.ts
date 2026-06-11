import type { Product, ProductSearchField } from '@/types/product'

export type FindProductsParams = {
  search: string
  searchField: ProductSearchField
  limit?: number
}

export interface ProductRepository {
  findMany(params: FindProductsParams): Promise<Product[]>
}
