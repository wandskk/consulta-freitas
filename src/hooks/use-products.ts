'use client'

import { useCallback, useState } from 'react'

import { productApiService } from '@/services/product-api.service'
import type { Product, ProductSearchParams } from '@/types/product'

export type UseProductsState = {
  products: Product[]
  total: number
  isLoading: boolean
  error: string | null
  hasSearched: boolean
}

const initialState: UseProductsState = {
  products: [],
  total: 0,
  isLoading: false,
  error: null,
  hasSearched: false,
}

export function useProducts() {
  const [state, setState] = useState<UseProductsState>(initialState)

  const searchProducts = useCallback(async (params: ProductSearchParams) => {
    const normalizedSearch = params.search.trim()

    if (!normalizedSearch) {
      setState(initialState)
      return
    }

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
      hasSearched: true,
    }))

    try {
      const response = await productApiService.searchProducts({
        search: normalizedSearch,
        searchField: params.searchField,
        limit: params.limit,
      })

      setState({
        products: response.products,
        total: response.total,
        isLoading: false,
        error: null,
        hasSearched: true,
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao buscar produtos.'

      setState({
        products: [],
        total: 0,
        isLoading: false,
        error: message,
        hasSearched: true,
      })
    }
  }, [])

  const clearProducts = useCallback(() => {
    setState(initialState)
  }, [])

  const restoreProducts = useCallback((productsState: UseProductsState) => {
    setState(productsState)
  }, [])

  return {
    ...state,
    searchProducts,
    clearProducts,
    restoreProducts,
  }
}
