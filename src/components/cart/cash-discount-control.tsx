'use client'

import { useState } from 'react'

import { useCart } from '@/contexts/cart-context'

type CashDiscountControlProps = {
  variant?: 'default' | 'compact'
}

export function CashDiscountControl({
  variant = 'default',
}: CashDiscountControlProps) {
  const { cashDiscountPercentage, updateCashDiscountPercentage } = useCart()
  const [discountInputValue, setDiscountInputValue] = useState(
    String(cashDiscountPercentage)
  )
  const [isEditingDiscount, setIsEditingDiscount] = useState(false)

  const isCompact = variant === 'compact'
  const visibleDiscountValue = isEditingDiscount
    ? discountInputValue
    : String(cashDiscountPercentage)

  return (
    <div
      className={
        isCompact
          ? 'rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm'
          : 'rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm'
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Desconto à vista
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Esse percentual afeta a listagem e o carrinho. Fica salvo neste
            dispositivo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
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
            className="h-11 w-24 rounded-xl border border-zinc-300 px-3 text-center text-sm font-semibold outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />

          <span className="text-sm font-semibold text-zinc-700">%</span>
        </div>
      </div>
    </div>
  )
}
