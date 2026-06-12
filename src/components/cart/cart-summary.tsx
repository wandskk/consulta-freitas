'use client'

import { CashDiscountControl } from '@/components/cart/cash-discount-control'
import { useCart } from '@/contexts/cart-context'
import { formatCurrency } from '@/helpers/currency.helper'

export function CartSummary() {
  const { totals, clearCart } = useCart()

  return (
    <aside className="overflow-hidden rounded-2xl border border-[#ffd2c2] bg-white shadow-[0_12px_28px_rgba(191,54,12,0.10)] lg:sticky lg:top-24">
      <div className="h-1.5 bg-[#e43d16]" />

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black text-[#151515]">Resumo</h2>

          <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#c82f0d]">
            Checkout
          </span>
        </div>

        <div className="mt-4">
          <CashDiscountControl variant="summary" />
        </div>

        <div className="mt-4 space-y-3 rounded-2xl bg-[#fffaf7] p-4 ring-1 ring-[#ffd2c2]">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-[#80665c]">Itens</span>
            <strong className="text-[#151515]">{totals.totalItems}</strong>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-[#80665c]">Total cartao</span>
            <strong className="text-[#151515]">
              {formatCurrency(totals.subtotalCard)}
            </strong>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-[#80665c]">Desconto</span>
            <strong className="text-emerald-700">
              {formatCurrency(totals.discountAmount)}
            </strong>
          </div>

          <div className="border-t border-[#ffd2c2] pt-3">
            <div className="flex items-end justify-between gap-4">
              <span className="text-sm font-black text-[#151515]">
                Total a vista
              </span>

              <strong className="text-2xl font-black text-emerald-700">
                {formatCurrency(totals.subtotalCash)}
              </strong>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={clearCart}
          disabled={totals.totalItems === 0}
          className="mt-4 h-11 w-full rounded-xl border border-red-200 bg-white px-4 text-sm font-black text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Limpar carrinho
        </button>
      </div>
    </aside>
  )
}
