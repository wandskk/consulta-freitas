'use client'

import { useState } from 'react'

import { useCart } from '@/contexts/cart-context'
import { formatCurrency } from '@/helpers/currency.helper'

export function CartSummary() {
  const {
    totals,
    cashDiscountPercentage,
    updateCashDiscountPercentage,
    clearCart,
  } = useCart()
  const [discountInputValue, setDiscountInputValue] = useState(
    String(cashDiscountPercentage)
  )
  const [isEditingDiscount, setIsEditingDiscount] = useState(false)
  const visibleDiscountValue = isEditingDiscount
    ? discountInputValue
    : String(cashDiscountPercentage)

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

        <div className="mt-4 rounded-2xl border border-[#ffd2c2] bg-[#fff7f0] p-3">
          <label
            htmlFor="cash-discount"
            className="mb-2 block text-xs font-black uppercase tracking-wide text-[#80665c]"
          >
            Desconto à vista
          </label>

          <div className="flex items-center gap-2">
            <input
              id="cash-discount"
              type="number"
              min={0}
              max={100}
              value={visibleDiscountValue}
              onFocus={() => {
                setIsEditingDiscount(true)
                setDiscountInputValue(String(cashDiscountPercentage))
              }}
              onChange={(event) => {
                const nextValue = event.target.value

                setDiscountInputValue(nextValue)

                if (nextValue === '') {
                  return
                }

                updateCashDiscountPercentage(Number(nextValue))
              }}
              onBlur={() => {
                setIsEditingDiscount(false)

                if (discountInputValue === '') {
                  setDiscountInputValue(String(cashDiscountPercentage))
                }
              }}
              className="h-11 min-w-0 flex-1 rounded-xl border border-[#ffd2c2] bg-white px-3 text-sm font-black text-[#151515] outline-none focus:border-[#e43d16] focus:ring-4 focus:ring-[#e43d16]/15"
            />

            <span className="rounded-xl bg-white px-3 py-3 text-sm font-black text-[#80665c]">
              %
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl bg-[#fffaf7] p-4 ring-1 ring-[#ffd2c2]">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-[#80665c]">Itens</span>
            <strong className="text-[#151515]">{totals.totalItems}</strong>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-[#80665c]">Total cartão</span>
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
                Total à vista
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
