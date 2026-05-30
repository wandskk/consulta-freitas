'use client'

import { useCart } from '@/contexts/cart-context'
import { formatCurrency } from '@/helpers/currency.helper'

export function CartSummary() {
  const {
    totals,
    cashDiscountPercentage,
    updateCashDiscountPercentage,
    clearCart,
  } = useCart()

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
      <div className="border-b border-zinc-100 pb-4">
        <h2 className="text-lg font-bold text-zinc-950">Resumo</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Valores calculados apenas para conferência. Não há finalização de
          compra.
        </p>
      </div>

      <div className="space-y-4 py-4">
        <div>
          <label
            htmlFor="cash-discount"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Desconto à vista (%)
          </label>

          <input
            id="cash-discount"
            type="number"
            min={0}
            max={100}
            value={cashDiscountPercentage}
            onChange={(event) =>
              updateCashDiscountPercentage(Number(event.target.value))
            }
            className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />

          <p className="mt-2 text-xs text-zinc-500">
            O padrão é 10%, mas você pode alterar. Esse valor fica salvo neste
            dispositivo.
          </p>
        </div>

        <div className="space-y-3 rounded-xl bg-zinc-50 p-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-zinc-500">Itens</span>
            <strong className="text-zinc-950">{totals.totalItems}</strong>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-zinc-500">Total cartão</span>
            <strong className="text-zinc-950">
              {formatCurrency(totals.subtotalCard)}
            </strong>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-zinc-500">Desconto</span>
            <strong className="text-green-700">
              {formatCurrency(totals.discountAmount)}
            </strong>
          </div>

          <div className="border-t border-zinc-200 pt-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-zinc-600">
                Total à vista
              </span>

              <strong className="text-xl font-bold text-green-700">
                {formatCurrency(totals.subtotalCash)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={clearCart}
        disabled={totals.totalItems === 0}
        className="h-11 w-full rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Limpar carrinho
      </button>
    </aside>
  )
}