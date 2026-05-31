'use client'

import { QuantityControl } from '@/components/cart/quantity-control'
import { useCart } from '@/contexts/cart-context'
import { calculateCashPrice } from '@/helpers/cart.helper'
import { formatCurrency } from '@/helpers/currency.helper'
import type { CartItem } from '@/types/cart'

type CartItemCardProps = {
  item: CartItem
}

function formatStock(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(value)
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
    <article className="overflow-hidden rounded-2xl border border-[#ffd2c2] bg-white shadow-[0_12px_28px_rgba(191,54,12,0.10)]">
      <div className="h-1.5 bg-[#e43d16]" />

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#c82f0d]">
            Código {product.codigo}
          </span>

          <span className="rounded-full border border-[#ffd2c2] px-3 py-1 text-[11px] font-bold text-[#80665c]">
            Estoque {formatStock(product.estoque)}
          </span>
        </div>

        <h2 className="mt-3 text-base font-black leading-6 text-[#151515] sm:text-lg">
          {product.nome}
        </h2>

        <div className="mt-2 grid gap-1 text-xs font-semibold text-[#80665c] sm:flex sm:flex-wrap sm:gap-2">
          <span>EAN: {product.codigoEan || 'Não informado'}</span>
          <span className="hidden sm:inline">•</span>
          <span>Localização: {product.localizacao || 'Não informada'}</span>
        </div>
      </div>

      <div className="grid gap-3 border-y border-[#ffd2c2] bg-[#fffaf7] p-3 sm:grid-cols-[auto_1fr] sm:items-center">
        <QuantityControl
          quantity={quantity}
          onDecrease={() => decreaseQuantity(product.id)}
          onIncrease={() => increaseQuantity(product.id)}
          onChange={(nextQuantity) =>
            updateQuantity(product.id, nextQuantity)
          }
        />

        <div className="grid grid-cols-2 gap-2 text-sm sm:justify-self-end sm:text-right">
          <div className="rounded-xl bg-white px-3 py-2">
            <span className="block text-[11px] font-black uppercase tracking-wide text-[#80665c]">
              Cartão
            </span>
            <strong className="text-[#151515]">
              {formatCurrency(cardTotal)}
            </strong>
          </div>

          <div className="rounded-xl bg-emerald-50 px-3 py-2">
            <span className="block text-[11px] font-black uppercase tracking-wide text-emerald-700">
              À vista
            </span>
            <strong className="text-emerald-700">
              {formatCurrency(cashTotal)}
            </strong>
          </div>
        </div>
      </div>

      <div className="bg-white p-3">
        <button
          type="button"
          onClick={() => removeProduct(product.id)}
          className="h-11 w-full rounded-xl border border-red-200 bg-white px-4 text-sm font-black text-red-700 transition hover:bg-red-50"
        >
          Remover
        </button>
      </div>
    </article>
  )
}
