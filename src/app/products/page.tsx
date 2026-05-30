'use client'

import { useEffect, useState } from 'react'

import { ProductList } from '@/components/products/product-list'
import { ProductSearch } from '@/components/products/product-search'
import { useDebounce } from '@/hooks/use-debounce'
import { useProducts } from '@/hooks/use-products'

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
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-zinc-950 p-6 text-white shadow-sm">
          <span className="text-sm font-medium text-zinc-300">
            Consulta Freitas
          </span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Consulta de produtos
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
            Pesquise produtos por nome, código interno ou código de barras.
            Os dados exibidos são baseados na tabela de preço Preco1.
          </p>
        </header>

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
    </main>
  )
}