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
          ? 'rounded-2xl border border-[#ffd2c2] bg-white p-3 shadow-sm'
          : 'rounded-2xl border border-[#ffd2c2] bg-white p-4 shadow-sm'
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-black text-[#151515]">
            Desconto à vista
          </h2>

          <p className="mt-1 text-xs font-semibold text-[#80665c]">
            Afeta listagem e carrinho.
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
            className="h-11 w-24 rounded-xl border border-[#ffd2c2] bg-white px-3 text-center text-sm font-black text-[#151515] outline-none focus:border-[#e43d16] focus:ring-4 focus:ring-[#e43d16]/15"
          />

          <span className="text-sm font-black text-[#80665c]">%</span>
        </div>
      </div>
    </div>
  )
}
