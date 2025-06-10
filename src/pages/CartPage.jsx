import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import useOrderStore from "../store/useOrderStore";

import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

const CartPage = () => {
  const { deleteFromCart, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const orders = useOrderStore((state) => state.orders);
  const cart = useCartStore((state) => state.cart);
  const user = useAuthStore((state) => state.user);

  //initialized hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  function handlePurchase(data) {
    if (cart.length > 0) {
      addOrder({
        id: cart.length * 3023, // to make it unique for now || avoid problems
        user,
        purchaseProducts: cart,
        addrs: data,
        orderStatus: "pending",
        timeElapsed: 5,
        estimatedTime: 25,
      });
      clearCart();
      reset();
    }
  }

  console.log(orders);

  return (
    <main className="min-h-screen bg-green-950">
      <div className="container mx-auto px-4 py-8">
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items Section */}
          <div className="space-y-4">
            <div className="bg-green-900 rounded-lg shadow-md p-6 border border-green-800">
              <h2 className="text-xl font-semibold text-green-100 mb-4">
                Cart Items
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-green-200">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((product) => (
                    <div
                      className="relative bg-green-800 rounded-lg p-4 border border-green-700"
                      key={product.id}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-center space-y-2">
                          <div className="bg-green-700 text-white rounded-md p-3 border border-green-600">
                            <h3 className="font-semibold text-lg mb-2">
                              {product.name}
                            </h3>
                            <div className="space-y-1 text-sm">
                              <p>Price: ₱{product.price * product.quantity}</p>
                              <p>Quantity: {product.quantity}</p>
                              <p>Unit Price: ₱{product.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <img
                            className="w-32 h-32 object-cover rounded-lg shadow-sm border border-green-600"
                            src={product.imageCover}
                            alt={product.name}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => deleteFromCart(product.id)}
                        className="absolute top-4 right-4 p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-4">
            <div className="bg-green-900 rounded-lg shadow-md p-6 border border-green-800">
              <h2 className="text-xl font-semibold text-green-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-6">
                {/* Shipping Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-green-200">
                    Shipping Information
                  </h3>

                  <div>
                    <input
                      type="text"
                      placeholder="Complete Address"
                      className="w-full px-4 py-3 bg-green-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors text-white placeholder-green-200"
                      {...register("completeAddrs", {
                        required: "Address is required",
                      })}
                    />
                    {errors.completeAddrs && (
                      <p className="mt-1 text-sm text-red-600 italic">
                        This field is required!
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-green-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors text-white placeholder-green-200"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                      })}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600 italic">
                        This field is required!
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-green-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors text-white placeholder-green-200"
                      {...register("email", {})}
                    />
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-green-950 rounded-lg p-6 text-white border border-green-800">
                  <h3 className="text-lg font-semibold mb-4">Order Details</h3>

                  <div className="space-y-3 mb-4">
                    {cart.map((product) => (
                      <div
                        className="flex justify-between items-center py-2 border-b border-green-800 last:border-b-0"
                        key={product.id}
                      >
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-green-200">
                            Qty: {product.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ₱{product.price * product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-green-800 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span>₱{total}</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={cart.length === 0}
                    className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg border border-green-500"
                    onClick={handleSubmit(handlePurchase)}
                  >
                    Finalize Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CartPage;
