import { useNavigate } from "react-router-dom";
import { LogOut, Clock, Package, CheckCircle, Truck, User, Phone, MapPin } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useOrderStore from "../store/useOrderStore";
import profile from "../assets/Profile.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, userRole, user } = useAuthStore();
  const orders = useOrderStore((state) => state.orders);
  
  const handleLogout = () => {
    console.log('Before logout:', { isAuthenticated, userRole, user });
    logout();
    console.log('After logout:', useOrderStore.getState());
    navigate('/');
  };

  // Filter orders for the current user
  // Handle both cases: when user is stored as object or when comparing by ID/name
  const userOrders = orders.filter(order => {
    if (!order.user || !user) return false;
    
    // If user has an ID, compare by ID
    if (user.id && order.user.id) {
      return order.user.id === user.id;
    }
    
    // Otherwise compare by name
    return order.user.name === user.name;
  });

  // Debug logging - remove this after testing
  console.log('Current user:', user);
  console.log('All orders:', orders);
  console.log('User orders:', userOrders);
  
  // Categorize orders
  const pendingOrders = userOrders.filter(order => 
    ['pending', 'preparing', 'ready', 'on_the_way'].includes(order.orderStatus)
  );
  
  const completedOrders = userOrders.filter(order => 
    order.orderStatus === 'delivered'
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'on_the_way': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'preparing': return <Package className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'on_the_way': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Order Placed';
      case 'preparing': return 'Being Prepared';
      case 'ready': return 'Ready for Pickup';
      case 'on_the_way': return 'On the Way';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const OrderCard = ({ order, isCompleted = false }) => {
    const totalItems = order.purchaseProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    const totalPrice = order.purchaseProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    return (
      <div className={`border rounded-lg p-4 mb-4 ${isCompleted ? 'bg-gray-50' : 'bg-white'} shadow-sm`}>
        {/* Order Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
              {getStatusIcon(order.orderStatus)}
              {getStatusText(order.orderStatus)}
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">₱{totalPrice}</div>
            <div className="text-sm text-gray-500">{totalItems} item{totalItems > 1 ? 's' : ''}</div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-3">
          <div className="space-y-2">
            {order.purchaseProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">Quantity: {product.quantity}</div>
                </div>
                <div className="text-gray-900 font-medium">
                  ₱{product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-700 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Delivery Address</span>
          </div>
          <div className="text-sm text-gray-600 ml-6">
            {order.addrs.completeAddrs}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 ml-6 mt-1">
            <Phone className="w-3 h-3" />
            <span>{order.addrs.phoneNumber}</span>
          </div>
        </div>

        {/* Time Information */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            {!isCompleted && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {order.timeElapsed}m / {order.estimatedTime}m
                {order.timeElapsed >= order.estimatedTime && (
                  <span className="text-red-600 font-medium ml-1">(Overdue)</span>
                )}
              </span>
            )}
          </div>
          <div>
            {order.statusUpdatedAt && (
              <span>Updated: {new Date(order.statusUpdatedAt).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-5">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <img src={profile} alt="profile" className="w-20 h-20 border-2 rounded-full object-cover"/>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600 capitalize">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{pendingOrders.length}</div>
              <div className="text-gray-600">Pending Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedOrders.length}</div>
              <div className="text-gray-600">Completed Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{userOrders.length}</div>
              <div className="text-gray-600">Total Orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            Pending Orders ({pendingOrders.length})
          </h2>
          <div className="max-h-96 overflow-y-auto">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No pending orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Completed Orders ({completedOrders.length})
          </h2>
          <div className="max-h-96 overflow-y-auto">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} isCompleted={true} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No completed orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;