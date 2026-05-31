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
      <div className="grid gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-2xl border border-[#ffd2c2] bg-white p-4 shadow-sm"
          >
            <div className="h-5 w-32 rounded bg-[#fff0e8]" />
            <div className="mt-4 h-6 w-4/5 rounded bg-[#fff0e8]" />
            <div className="mt-3 h-4 w-1/2 rounded bg-[#fff0e8]" />
            <div className="mt-6 grid gap-3">
              <div className="h-20 rounded-xl bg-[#fff0e8]" />
              <div className="h-12 rounded-xl bg-[#fff0e8]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm font-medium text-red-700">
        <strong className="block text-base">Erro ao buscar produtos</strong>
        <span className="mt-1 block">{error}</span>
      </div>
    )
  }

  if (hasSearched && products.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ffd2c2] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0e8] text-xl font-black text-[#e43d16]">
          ?
        </div>

        <h3 className="mt-4 text-lg font-black text-[#151515]">
          Nenhum produto encontrado
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#80665c]">
          Tente pesquisar por outro nome, código interno ou código de barras.
        </p>
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ffc5af] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0e8] text-xl font-black text-[#e43d16]">
          F
        </div>

        <h3 className="mt-4 text-lg font-black text-[#151515]">
          Pesquise um produto
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#80665c]">
          Digite o nome, código interno ou código de barras para consultar preço,
          estoque e adicionar itens ao carrinho.
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between rounded-2xl border border-[#ffd2c2] bg-white px-4 py-3 text-sm text-[#80665c] shadow-sm">
        <span>
          <strong className="text-[#151515]">
            {total}
          </strong>{' '}
          produto{total === 1 ? '' : 's'} encontrado{total === 1 ? '' : 's'}
        </span>

        <strong className="rounded-full bg-[#e43d16] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
          Busca
        </strong>
      </div>

      <div className="grid gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
