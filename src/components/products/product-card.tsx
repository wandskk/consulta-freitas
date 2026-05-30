import { formatCurrency } from '@/helpers/currency.helper'
import { getStockStatus } from '@/helpers/stock.helper'
import type { Product } from '@/types/product'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const stockStatus = getStockStatus(product.estoque)

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Código {product.codigo}
          </span>

          <h2 className="mt-1 text-base font-semibold text-zinc-950">
            {product.nome}
          </h2>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
            <span>EAN: {product.codigoEan || 'Não informado'}</span>
            <span>•</span>
            <span>Localização: {product.localizacao || 'Não informada'}</span>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <strong className="block text-xl font-bold text-zinc-950">
            {formatCurrency(product.preco)}
          </strong>

          <span
            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${stockStatus.className}`}
          >
            {stockStatus.label}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-zinc-50 p-3">
        <span className="text-xs text-zinc-500">Estoque atual</span>
        <p className="text-lg font-semibold text-zinc-900">
          {product.estoque}
        </p>
      </div>
    </article>
  )
}