import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            const updatedCart = state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { cart: updatedCart };
          } else {
            return { cart: [{ ...product, quantity: 1 }, ...state.cart] };
          }
        }),

      deleteFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== id),
        })),

      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),

    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
