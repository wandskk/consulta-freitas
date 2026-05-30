'use client'

import { useCart } from '@/contexts/cart-context'
import { calculateCashPrice } from '@/helpers/cart.helper'
import { formatCurrency } from '@/helpers/currency.helper'
import type { CartItem } from '@/types/cart'

type CartItemCardProps = {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const {
    cashDiscountPercentage,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeProduct,
  } = useCart()

  const { product, quantity } = item

  const cardTotal = product.preco * quantity
  const cashPrice = calculateCashPrice(
    product.preco,
    cashDiscountPercentage
  )
  const cashTotal = cashPrice * quantity

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
            Código {product.codigo}
          </span>

          <h2 className="mt-3 text-base font-semibold leading-6 text-zinc-950">
            {product.nome}
          </h2>

          <div className="mt-2 flex flex-col gap-1 text-xs text-zinc-500 sm:flex-row sm:flex-wrap sm:gap-2">
            <span>EAN: {product.codigoEan || 'Não informado'}</span>
            <span className="hidden sm:inline">•</span>
            <span>Localização: {product.localizacao || 'Não informada'}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-80">
          <div className="rounded-xl bg-zinc-50 p-3">
            <span className="text-xs text-zinc-500">Unitário cartão</span>
            <strong className="mt-1 block text-lg font-bold text-zinc-950">
              {formatCurrency(product.preco)}
            </strong>
          </div>

          <div className="rounded-xl bg-green-50 p-3">
            <span className="text-xs text-green-700">
              Unitário à vista -{cashDiscountPercentage}%
            </span>
            <strong className="mt-1 block text-lg font-bold text-green-700">
              {formatCurrency(cashPrice)}
            </strong>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => decreaseQuantity(product.id)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 text-lg font-semibold text-zinc-700 transition hover:bg-zinc-100"
            aria-label="Diminuir quantidade"
          >
            -
          </button>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(event) =>
              updateQuantity(product.id, Number(event.target.value))
            }
            className="h-10 w-20 rounded-xl border border-zinc-300 text-center text-sm font-semibold outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />

          <button
            type="button"
            onClick={() => increaseQuantity(product.id)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 text-lg font-semibold text-zinc-700 transition hover:bg-zinc-100"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        <div className="grid gap-2 text-sm sm:min-w-72 sm:text-right">
          <div>
            <span className="text-zinc-500">Total cartão: </span>
            <strong className="text-zinc-950">
              {formatCurrency(cardTotal)}
            </strong>
          </div>

          <div>
            <span className="text-zinc-500">Total à vista: </span>
            <strong className="text-green-700">
              {formatCurrency(cashTotal)}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={() => removeProduct(product.id)}
          className="h-10 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50"
        >
          Remover
        </button>
      </div>
    </article>
  )
}