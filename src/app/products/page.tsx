'use client'

import { useEffect, useState } from 'react'

import { AppShell } from '@/components/layout/app-shell'
import { ProductList } from '@/components/products/product-list'
import { ProductSearch } from '@/components/products/product-search'
import { useDebounce } from '@/hooks/use-debounce'
import { useProducts } from '@/hooks/use-products'
import { CashDiscountControl } from '@/components/cart/cash-discount-control'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const {
    products,
    total,
    isLoading,
    error,
    hasSearched,
    searchProducts,
    clearProducts,
  } = useProducts()

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      clearProducts()
      return
    }

    searchProducts(debouncedSearch)
  }, [debouncedSearch, searchProducts, clearProducts])

  function handleClear() {
    setSearch('')
    clearProducts()
  }

  return (
    <AppShell>
      <div className="space-y-6">

        <ProductSearch
          value={search}
          isLoading={isLoading}
          onChange={setSearch}
          onClear={handleClear}
        />

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