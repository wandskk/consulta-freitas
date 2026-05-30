import {
  DEFAULT_CASH_DISCOUNT_PERCENTAGE,
  MAX_CASH_DISCOUNT_PERCENTAGE,
  MIN_CASH_DISCOUNT_PERCENTAGE,
} from '@/constants/cart.constants'
import type { CartItem, CartTotals } from '@/types/cart'

export function normalizeCashDiscountPercentage(value: number): number {
  if (Number.isNaN(value)) {
    return DEFAULT_CASH_DISCOUNT_PERCENTAGE
  }

  if (value < MIN_CASH_DISCOUNT_PERCENTAGE) {
    return MIN_CASH_DISCOUNT_PERCENTAGE
  }

  if (value > MAX_CASH_DISCOUNT_PERCENTAGE) {
    return MAX_CASH_DISCOUNT_PERCENTAGE
  }

  return value
}

export function calculateCashPrice(
  price: number,
  cashDiscountPercentage: number
): number {
  const normalizedDiscount = normalizeCashDiscountPercentage(
    cashDiscountPercentage
  )

  const discountMultiplier = 1 - normalizedDiscount / 100

  return roundCurrency(price * discountMultiplier)
}

export function calculateCartTotals(
  items: CartItem[],
  cashDiscountPercentage: number
): CartTotals {
  const normalizedDiscount = normalizeCashDiscountPercentage(
    cashDiscountPercentage
  )

  const subtotalCard = items.reduce((total, item) => {
    return total + item.product.preco * item.quantity
  }, 0)

  const subtotalCash = items.reduce((total, item) => {
    const cashPrice = calculateCashPrice(
      item.product.preco,
      normalizedDiscount
    )

    return total + cashPrice * item.quantity
  }, 0)

  const totalItems = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const roundedSubtotalCard = roundCurrency(subtotalCard)
  const roundedSubtotalCash = roundCurrency(subtotalCash)

  return {
    totalItems,
    subtotalCard: roundedSubtotalCard,
    subtotalCash: roundedSubtotalCash,
    discountAmount: roundCurrency(roundedSubtotalCard - roundedSubtotalCash),
    cashDiscountPercentage: normalizedDiscount,
  }
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function isProductInCart(items: CartItem[], productId: number): boolean {
  return items.some((item) => item.product.id === productId)
}

export function getProductQuantityInCart(
  items: CartItem[],
  productId: number
): number {
  const cartItem = items.find((item) => item.product.id === productId)

  return cartItem?.quantity ?? 0
}