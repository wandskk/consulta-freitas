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
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="h-5 w-32 rounded bg-zinc-200" />
            <div className="mt-4 h-6 w-3/4 rounded bg-zinc-200" />
            <div className="mt-3 h-4 w-1/2 rounded bg-zinc-200" />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="h-16 rounded-xl bg-zinc-100" />
              <div className="h-16 rounded-xl bg-zinc-100" />
              <div className="h-16 rounded-xl bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
        <strong className="block text-base">Erro ao buscar produtos</strong>
        <span className="mt-1 block">{error}</span>
      </div>
    )
  }

  if (hasSearched && products.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
          🔎
        </div>

        <h3 className="mt-4 text-lg font-bold text-zinc-950">
          Nenhum produto encontrado
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Tente pesquisar por outro nome, código interno ou código de barras.
        </p>
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
          📦
        </div>

        <h3 className="mt-4 text-lg font-bold text-zinc-950">
          Pesquise um produto
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Digite o nome, código interno ou código de barras para consultar preço,
          estoque e adicionar itens ao carrinho.
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
        <strong className="text-zinc-950">
          {total} produto{total === 1 ? '' : 's'}
        </strong>{' '}
        encontrado{total === 1 ? '' : 's'}.
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}