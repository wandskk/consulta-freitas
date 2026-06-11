import type {
  ProductSearchParams,
  ProductSearchResponse,
} from '@/types/product'
import type { ApiResponse } from '@/utils/api-response'

export class ProductApiService {
  async searchProducts(
    params: ProductSearchParams
  ): Promise<ProductSearchResponse> {
    const searchParams = new URLSearchParams()

    searchParams.set('search', params.search)
    searchParams.set('searchField', params.searchField)

    if (params.limit) {
      searchParams.set('limit', String(params.limit))
    }

    const response = await fetch(`/api/products?${searchParams.toString()}`)

    const result = (await response.json()) as ApiResponse<ProductSearchResponse>

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Erro ao buscar produtos.')
    }

    return result.data
  }
}

export const productApiService = new ProductApiService()
