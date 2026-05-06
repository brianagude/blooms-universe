import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  variantId: string
  productHandle: string
  title: string
  variantTitle: string
  price: string
  currencyCode: string
  image: string | null
  quantity: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartActions = {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export type CartStore = CartState & CartActions

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (incoming) => {
        const { items } = get()
        const quantity = incoming.quantity ?? 1
        const existing = items.find((i) => i.variantId === incoming.variantId)

        if (existing) {
          set({
            items: items.map((i) =>
              i.variantId === incoming.variantId
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          })
        } else {
          set({ items: [...items, { ...incoming, quantity }] })
        }
      },

      removeItem: (variantId) =>
        set({ items: get().items.filter((i) => i.variantId !== variantId) }),

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
        })
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'blooms-cart' },
  ),
)

// ── Selectors ─────────────────────────────────────────────────────────────────

export const selectItemCount = (state: CartStore) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectSubtotal = (state: CartStore) =>
  state.items
    .reduce((sum, i) => sum + Number.parseFloat(i.price) * i.quantity, 0)
    .toFixed(2)
