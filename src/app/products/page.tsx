'use client'

import { ProductList } from '@/components/products/product-list'
import { ProductSearch } from '@/components/products/product-search'
import { useProducts } from '@/hooks/use-products'

export default function ProductsPage() {
  const {
    products,
    total,
    isLoading,
    error,
    hasSearched,
    searchProducts,
    clearProducts,
  } = useProducts()

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <span className="text-sm font-medium text-zinc-500">
            Consulta Freitas
          </span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
            Consulta de produtos
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Pesquise produtos por nome, código interno ou código de barras.
            Os dados exibidos são baseados na tabela de preço Preco1.
          </p>
        </header>

        <ProductSearch
          isLoading={isLoading}
          onSearch={searchProducts}
          onClear={clearProducts}
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