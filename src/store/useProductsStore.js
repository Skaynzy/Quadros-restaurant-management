import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { productsList } from "../data/productsList";

const useProductsStore = create(
  persist(
    (set) => ({
      products: productsList,

      addProduct: (newProduct) =>
        set((state) => ({
          products: [newProduct, ...state.products],
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id != id),
        })),
    }),
    {
      name: "store-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductsStore;
