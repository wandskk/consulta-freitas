'use client'

import { useEffect, useState } from 'react'

import { CashDiscountControl } from '@/components/cart/cash-discount-control'
import { AppShell } from '@/components/layout/app-shell'
import { ProductList } from '@/components/products/product-list'
import { ProductSearch } from '@/components/products/product-search'
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/helpers/local-storage.helper'
import { useDebounce } from '@/hooks/use-debounce'
import { useProducts, type UseProductsState } from '@/hooks/use-products'
import type { Product, ProductSearchField } from '@/types/product'

const PRODUCT_SEARCH_STORAGE_KEY = '@consulta-freitas:product-search'
const DEFAULT_SEARCH_FIELD: ProductSearchField = 'nome'

type StoredProductSearch = {
  search: string
  searchField: ProductSearchField
  products: Product[]
  total: number
  hasSearched: boolean
}

const defaultStoredProductSearch: StoredProductSearch = {
  search: '',
  searchField: DEFAULT_SEARCH_FIELD,
  products: [],
  total: 0,
  hasSearched: false,
}

function isProductSearchField(value: unknown): value is ProductSearchField {
  return value === 'id' || value === 'codigo' || value === 'nome'
}

function getStoredProductSearch(): StoredProductSearch {
  const stored = getLocalStorageItem<Partial<StoredProductSearch>>(
    PRODUCT_SEARCH_STORAGE_KEY,
    defaultStoredProductSearch
  )

  return {
    search: typeof stored.search === 'string' ? stored.search : '',
    searchField: isProductSearchField(stored.searchField)
      ? stored.searchField
      : DEFAULT_SEARCH_FIELD,
    products: Array.isArray(stored.products) ? stored.products : [],
    total: typeof stored.total === 'number' ? stored.total : 0,
    hasSearched:
      typeof stored.hasSearched === 'boolean' ? stored.hasSearched : false,
  }
}

function getInitialProductsState(
  storedProductSearch: StoredProductSearch
): UseProductsState {
  return {
    products: storedProductSearch.products,
    total: storedProductSearch.total,
    isLoading: false,
    error: null,
    hasSearched: storedProductSearch.hasSearched,
  }
}

export default function ProductsPage() {
  const [hasRestoredSearch, setHasRestoredSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [searchField, setSearchField] =
    useState<ProductSearchField>(DEFAULT_SEARCH_FIELD)
  const debouncedSearch = useDebounce(search, 500)

  const {
    products,
    total,
    isLoading,
    error,
    hasSearched,
    searchProducts,
    clearProducts,
    restoreProducts,
  } = useProducts()

  useEffect(() => {
    let isActive = true

    queueMicrotask(() => {
      if (!isActive) {
        return
      }

      const storedProductSearch = getStoredProductSearch()

      setSearch(storedProductSearch.search)
      setSearchField(storedProductSearch.searchField)
      restoreProducts(getInitialProductsState(storedProductSearch))
      setHasRestoredSearch(true)
    })

    return () => {
      isActive = false
    }
  }, [restoreProducts])

  useEffect(() => {
    if (!hasRestoredSearch) {
      return
    }

    if (search.trim() && debouncedSearch !== search) {
      return
    }

    if (!debouncedSearch.trim()) {
      clearProducts()
      return
    }

    searchProducts({
      search: debouncedSearch,
      searchField,
    })
  }, [
    debouncedSearch,
    search,
    searchField,
    hasRestoredSearch,
    searchProducts,
    clearProducts,
  ])

  useEffect(() => {
    if (!hasRestoredSearch) {
      return
    }

    if (!search.trim()) {
      setLocalStorageItem<StoredProductSearch>(PRODUCT_SEARCH_STORAGE_KEY, {
        search,
        searchField,
        products: [],
        total: 0,
        hasSearched: false,
      })
      return
    }

    setLocalStorageItem<StoredProductSearch>(PRODUCT_SEARCH_STORAGE_KEY, {
      search,
      searchField,
      products,
      total,
      hasSearched,
    })
  }, [search, searchField, products, total, hasSearched, hasRestoredSearch])

  return (
    <AppShell>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_320px] lg:items-start">
          <ProductSearch
            value={search}
            searchField={searchField}
            isLoading={isLoading}
            onChange={setSearch}
            onSearchFieldChange={setSearchField}
          />

          <CashDiscountControl variant="compact" />
        </div>

        <ProductList
          products={products}
          total={total}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
      </div>
    </AppShell>
  )
}
