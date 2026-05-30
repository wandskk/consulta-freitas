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
        <section className="rounded-3xl bg-zinc-950 p-6 text-white shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-zinc-300">
              Consulta interna
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Encontre produtos com rapidez
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:text-base">
              Pesquise por nome, código interno ou código de barras. A aplicação
              foi preparada para usar dados fictícios em MySQL durante o
              desenvolvimento e SQL Server na base real do ETrade.
            </p>
          </div>
        </section>

        <ProductSearch
          value={search}
          isLoading={isLoading}
          onChange={setSearch}
          onClear={handleClear}
        />

        <CashDiscountControl />

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