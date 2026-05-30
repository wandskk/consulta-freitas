import type { Product } from '@/types/product'

import { ProductCard } from './product-card'

type ProductListProps = {
  products: Product[]
  total: number
  isLoading: boolean
  error: string | null
  hasSearched: boolean
}

export function ProductList({
  products,
  total,
  isLoading,
  error,
  hasSearched,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500 shadow-sm">
        Buscando produtos...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
        {error}
      </div>
    )
  }

  if (hasSearched && products.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500 shadow-sm">
        Nenhum produto encontrado.
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center text-sm text-zinc-500">
        Pesquise por nome, código ou código de barras para começar.
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <div className="text-sm text-zinc-600">
        {total} produto{total === 1 ? '' : 's'} encontrado
        {total === 1 ? '' : 's'}.
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}