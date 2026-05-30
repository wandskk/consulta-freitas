import type { Product } from './product'

export type CartItem = {
  product: Product
  quantity: number
}

export type CartTotals = {
  totalItems: number
  subtotalCard: number
  subtotalCash: number
  discountAmount: number
  cashDiscountPercentage: number
}

export type StoredCartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  items: CartItem[]
  cashDiscountPercentage: number
}