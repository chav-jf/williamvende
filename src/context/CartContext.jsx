import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          priceFrom: product.priceFrom,
          qty: 1,
        },
      ]
    })
  }, [])

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    [],
  )

  const updateQty = useCallback(
    (id, delta) =>
      setItems((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p,
        ),
      ),
    [],
  )

  const clear = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const count = useMemo(
    () => items.reduce((n, p) => n + p.qty, 0),
    [items],
  )
  const estimatedTotal = useMemo(
    () => items.reduce((n, p) => n + (p.priceFrom || 0) * p.qty, 0),
    [items],
  )

  const value = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQty,
    clear,
    openCart,
    closeCart,
    count,
    estimatedTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
