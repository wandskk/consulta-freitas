import type { Product } from '@/types/product'

export type FindProductsParams = {
  search: string
  limit?: number
}

export interface ProductRepository {
  findMany(params: FindProductsParams): Promise<Product[]>
}