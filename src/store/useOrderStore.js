import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],

      addOrder: (newOrder) =>
        set((state) => ({
          orders: [...state.orders, newOrder],
        })),

      updateOrderStatus: (orderId, newStatus) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  orderStatus: newStatus,
                  timeElapsed:
                    newStatus === "preparing" ? 0 : order.timeElapsed,
                }
              : order
          ),
        })),

      removeOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        })),

      getOrdersByStatus: (status) => (state) =>
        state.orders.filter((order) => order.orderStatus === status),
    }),
    {
      name: "orders-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
