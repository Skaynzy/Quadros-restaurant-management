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
                    newStatus === "preparing" || newStatus === "on_the_way"
                      ? 0
                      : order.timeElapsed,
                  // Add timestamp for tracking when status changed
                  statusUpdatedAt: new Date().toISOString(),
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

      // Helper function to get orders for rider workflow
      getRiderOrders: () => (state) =>
        state.orders.filter((order) =>
          ["ready", "on_the_way", "delivered"].includes(order.orderStatus)
        ),

      // Helper function to get orders for kitchen workflow
      getKitchenOrders: () => (state) =>
        state.orders.filter((order) =>
          ["pending", "preparing", "ready"].includes(order.orderStatus)
        ),
    }),
    {
      name: "orders-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;