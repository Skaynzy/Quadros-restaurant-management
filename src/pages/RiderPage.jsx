import React, { useState, useEffect } from "react";
import useOrderStore from "../store/useOrderStore";
import {
  Clock,
  User,
  Phone,
  MapPin,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Navigation,
} from "lucide-react";

const RiderPage = () => {
  const { updateOrderStatus } = useOrderStore();
  const orders = useOrderStore((state) => state.orders);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('ready');

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
    if (status === "on_the_way") return "border-l-blue-400";
    if (status === "delivered") return "border-l-green-400";

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
        className={`bg-blue-900 rounded-lg p-3 sm:p-4 border-l-4 ${getCardBorderColor(
          order.orderStatus,
          order.timeElapsed,
          order.estimatedTime
        )} shadow-lg mb-4`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">#{order.id}</span>
            <div className="flex items-center gap-1 bg-blue-800 px-2 py-1 rounded-full">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs text-blue-200">Delivery</span>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-base sm:text-lg font-semibold ${getTimeColor(
                order.timeElapsed,
                order.estimatedTime
              )}`}
            >
              {order.timeElapsed}m / {order.estimatedTime}m
            </div>
            <div className="text-xs text-blue-300">
              {order.timeElapsed >= order.estimatedTime
                ? "OVERDUE"
                : `${order.estimatedTime - order.timeElapsed}m left`}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-blue-200 mb-1">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium text-sm sm:text-base">{order.user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300 text-xs sm:text-sm mb-1">
            <Phone className="w-3 h-3" />
            <span>{order.addrs.phoneNumber}</span>
          </div>
          <div className="flex items-start gap-2 text-blue-300 text-xs sm:text-sm">
            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span className="break-words">{order.addrs.completeAddrs}</span>
          </div>
        </div>

        {/* Items Summary */}
        <div className="mb-4">
          <div className="bg-blue-800 rounded p-2 sm:p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-200 text-xs sm:text-sm">Items ({totalItems}):</span>
              <span className="text-blue-200 font-semibold text-sm sm:text-base">₱{totalPrice}</span>
            </div>
            <div className="text-blue-300 text-xs">
              {order.purchaseProducts.map((product, index) => (
                <span key={index}>
                  {product.quantity}x {product.name}
                  {index < order.purchaseProducts.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {order.orderStatus === "ready" && (
            <button
              onClick={() => updateOrderStatus(order.id, "on_the_way")}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base"
            >
              <Package className="w-4 h-4" />
              Pick Up
            </button>
          )}

          {order.orderStatus === "on_the_way" && (
            <button
              onClick={() => updateOrderStatus(order.id, "delivered")}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4" />
              Delivered
            </button>
          )}

          <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Navigation className="w-4 h-4" />
          </button>

          <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Filter orders for delivery workflow
  const readyOrders = orders.filter((order) => order.orderStatus === "ready");
  const onTheWayOrders = orders.filter(
    (order) => order.orderStatus === "on_the_way"
  );
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "delivered"
  );

  // Get total active delivery orders (ready + on the way)
  const activeDeliveryOrders = readyOrders.length + onTheWayOrders.length;

  return (
    <div className="min-h-screen bg-blue-950 p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-white">Rider Dashboard</h1>
          <div className="text-blue-200 text-right">
            <div className="text-base sm:text-lg font-semibold">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-xs sm:text-sm">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-purple-900 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {readyOrders.length}
            </div>
            <div className="text-purple-300 text-xs sm:text-sm">Ready for Pickup</div>
          </div>
          <div className="bg-blue-900 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {onTheWayOrders.length}
            </div>
            <div className="text-blue-300 text-xs sm:text-sm">On the Way</div>
          </div>
          <div className="bg-green-900 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {deliveredOrders.length}
            </div>
            <div className="text-green-300 text-xs sm:text-sm">Delivered Today</div>
          </div>
          <div className="bg-blue-800 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {activeDeliveryOrders}
            </div>
            <div className="text-blue-300 text-xs sm:text-sm">Active Deliveries</div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="block sm:hidden mb-4">
        <div className="flex bg-blue-900 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('ready')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ready'
                ? 'bg-purple-600 text-white'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            Ready ({readyOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('on_the_way')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'on_the_way'
                ? 'bg-blue-600 text-white'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            On Way ({onTheWayOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'delivered'
                ? 'bg-green-600 text-white'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            Delivered ({deliveredOrders.length})
          </button>
        </div>
      </div>

      {/* Mobile Single Column View */}
      <div className="block sm:hidden">
        {activeTab === 'ready' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Ready for Pickup</h2>
            {readyOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {readyOrders.length === 0 && (
              <div className="text-center text-blue-300 py-8">
                No orders ready for pickup
              </div>
            )}
          </div>
        )}

        {activeTab === 'on_the_way' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">On the Way</h2>
            {onTheWayOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {onTheWayOrders.length === 0 && (
              <div className="text-center text-blue-300 py-8">
                No orders on the way
              </div>
            )}
          </div>
        )}

        {activeTab === 'delivered' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Delivered</h2>
            {deliveredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {deliveredOrders.length === 0 && (
              <div className="text-center text-blue-300 py-8">
                No deliveries completed today
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Kanban Board */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-6">
        {/* Ready for Pickup Column */}
        <div className="bg-purple-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Ready for Pickup</h2>
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

        {/* On the Way Column */}
        <div className="bg-blue-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">On the Way</h2>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {onTheWayOrders.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {onTheWayOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Delivered Column */}
        <div className="bg-green-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Delivered</h2>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {deliveredOrders.length}
            </span>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {deliveredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderPage;