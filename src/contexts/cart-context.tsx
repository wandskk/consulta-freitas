'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  CART_STORAGE_KEY,
  CASH_DISCOUNT_STORAGE_KEY,
  DEFAULT_CASH_DISCOUNT_PERCENTAGE,
} from '@/constants/cart.constants'
import {
  calculateCartTotals,
  getProductQuantityInCart,
  isProductInCart,
  normalizeCashDiscountPercentage,
} from '@/helpers/cart.helper'
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/helpers/local-storage.helper'
import type { CartItem, CartTotals } from '@/types/cart'
import type { Product } from '@/types/product'

type CartContextValue = {
  items: CartItem[]
  totals: CartTotals
  cashDiscountPercentage: number
  addProduct: (product: Product) => void
  removeProduct: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  updateCashDiscountPercentage: (percentage: number) => void
  isInCart: (productId: number) => boolean
  getQuantity: (productId: number) => number
}

const CartContext = createContext<CartContextValue | null>(null)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cashDiscountPercentage, setCashDiscountPercentage] = useState(
    DEFAULT_CASH_DISCOUNT_PERCENTAGE
  )
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    queueMicrotask(() => {
      const storedItems = getLocalStorageItem<CartItem[]>(CART_STORAGE_KEY, [])
      const storedDiscount = getLocalStorageItem<number>(
        CASH_DISCOUNT_STORAGE_KEY,
        DEFAULT_CASH_DISCOUNT_PERCENTAGE
      )

      setItems(storedItems)
      setCashDiscountPercentage(
        normalizeCashDiscountPercentage(Number(storedDiscount))
      )
      setIsHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    setLocalStorageItem(CART_STORAGE_KEY, items)
  }, [items, isHydrated])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    setLocalStorageItem(
      CASH_DISCOUNT_STORAGE_KEY,
      cashDiscountPercentage
    )
  }, [cashDiscountPercentage, isHydrated])

  const addProduct = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.product.id !== product.id) {
            return item
          }

          return {
            ...item,
            quantity: item.quantity + 1,
          }
        })
      }

      return [
        ...currentItems,
        {
          product,
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeProduct = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    )
  }, [])

  const increaseQuantity = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.id !== productId) {
          return item
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        }
      })
    )
  }, [])

  const decreaseQuantity = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.product.id !== productId) {
            return item
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          }
        })
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const normalizedQuantity = Math.floor(Number(quantity))

    if (Number.isNaN(normalizedQuantity) || normalizedQuantity <= 0) {
      removeProduct(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.id !== productId) {
          return item
        }

        return {
          ...item,
          quantity: normalizedQuantity,
        }
      })
    )
  }, [removeProduct])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const updateCashDiscountPercentage = useCallback((percentage: number) => {
    setCashDiscountPercentage(
      normalizeCashDiscountPercentage(Number(percentage))
    )
  }, [])

  const isInCart = useCallback(
    (productId: number) => {
      return isProductInCart(items, productId)
    },
    [items]
  )

  const getQuantity = useCallback(
    (productId: number) => {
      return getProductQuantityInCart(items, productId)
    },
    [items]
  )

  const totals = useMemo(() => {
    return calculateCartTotals(items, cashDiscountPercentage)
  }, [items, cashDiscountPercentage])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totals,
      cashDiscountPercentage,
      addProduct,
      removeProduct,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
      updateCashDiscountPercentage,
      isInCart,
      getQuantity,
    }),
    [
      items,
      totals,
      cashDiscountPercentage,
      addProduct,
      removeProduct,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
      updateCashDiscountPercentage,
      isInCart,
      getQuantity,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}
