import React, { useState, useEffect } from "react";
import useOrderStore from "../store/useOrderStore";
import {
  Clock,
  User,
  Phone,
  MapPin,
  Eye,
  Play,
  CheckCircle,
  Truck,
} from "lucide-react";

const StaffUIPage = () => {
  const { updateOrderStatus } = useOrderStore();
  const orders = useOrderStore((state) => state.orders);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeColor = (elapsed, estimated) => {
    const percentage = (elapsed / estimated) * 100;
    if (percentage >= 100) return "text-red-400";
    if (percentage >= 80) return "text-yellow-400";
    return "text-green-400";
  };

  const getCardBorderColor = (status, elapsed, estimated) => {
    if (status === "ready") return "border-l-purple-400";

    const percentage = (elapsed / estimated) * 100;
    if (percentage >= 100) return "border-l-red-400";
    if (percentage >= 80) return "border-l-yellow-400";
    return "border-l-green-400";
  };

  const OrderCard = ({ order }) => {
    const totalItems = order.purchaseProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    const totalPrice = order.purchaseProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    return (
      <div
        className={`bg-green-900 rounded-lg p-4 border-l-4 ${getCardBorderColor(
          order.orderStatus,
          order.timeElapsed,
          order.estimatedTime
        )} shadow-lg mb-4`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">#{order.id}</span>
            <div className="flex items-center gap-1 bg-green-800 px-2 py-1 rounded-full">
              <Truck className="w-4 h-4" />
              <span className="text-xs text-green-200">Delivery</span>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-lg font-semibold ${getTimeColor(
                order.timeElapsed,
                order.estimatedTime
              )}`}
            >
              {order.timeElapsed}m / {order.estimatedTime}m
            </div>
            <div className="text-xs text-green-300">
              {order.timeElapsed >= order.estimatedTime
                ? "OVERDUE"
                : `${order.estimatedTime - order.timeElapsed}m left`}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-green-200 mb-1">
            <User className="w-4 h-4" />
            <span className="font-medium">{order.user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-green-300 text-sm mb-1">
            <Phone className="w-3 h-3" />
            <span>{order.addrs.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-green-300 text-sm">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{order.addrs.completeAddrs}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-4">
          <div className="text-green-200 text-sm mb-2">
            Items ({totalItems}):
          </div>
          {order.purchaseProducts.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-start mb-2 bg-green-800 rounded p-2"
            >
              <div className="flex-1">
                <div className="text-white font-medium">
                  {product.quantity}x {product.name}
                </div>
              </div>
              <div className="text-green-300 text-sm">
                ₱{product.price * product.quantity}
              </div>
            </div>
          ))}
          <div className="text-right text-green-200 font-semibold">
            Total: ₱{totalPrice}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {order.orderStatus === "pending" && (
            <button
              onClick={() => updateOrderStatus(order.id, "preparing")}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Prep
            </button>
          )}

          {order.orderStatus === "preparing" && (
            <button
              onClick={() => updateOrderStatus(order.id, "ready")}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Ready
            </button>
          )}

          <button className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending"
  );
  const preparingOrders = orders.filter(
    (order) => order.orderStatus === "preparing"
  );
  const readyOrders = orders.filter((order) => order.orderStatus === "ready");

  return (
    <div className="min-h-screen bg-green-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-white">Kitchen Dashboard</h1>
          <div className="text-green-200">
            <div className="text-lg font-semibold">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {pendingOrders.length}
            </div>
            <div className="text-green-300">New Orders</div>
          </div>
          <div className="bg-yellow-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {preparingOrders.length}
            </div>
            <div className="text-yellow-300">In Progress</div>
          </div>
          <div className="bg-purple-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {readyOrders.length}
            </div>
            <div className="text-purple-300">Ready</div>
          </div>
          <div className="bg-green-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{orders.length}</div>
            <div className="text-green-300">Total Active</div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-3 gap-6">
        {/* New Orders Column */}
        <div className="bg-green-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">New Orders</h2>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {pendingOrders.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {pendingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-yellow-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Preparing</h2>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {preparingOrders.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {preparingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Ready Column */}
        <div className="bg-purple-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Ready to Pick Up</h2>
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {readyOrders.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {readyOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffUIPage;
