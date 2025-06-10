import useProductsStore from "../store/useProductsStore";
import useAuthStore from "../store/useAuthStore";
import ProductCard from "../components/products/ProductCard";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProductPage = () => {
  const [popUp, setPopUp] = useState(false);

  //react hook form initialized
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const products = useProductsStore((state) => state.products);
  const { addProduct } = useProductsStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  function togglePopUp() {
    setPopUp(!popUp);
    if (popUp) {
      reset();
    }
  }

  function handleCreateNewProduct(data) {
    const dataWithId = { id: products.length + 1, ...data };

    addProduct(dataWithId);

    setPopUp(false);
    reset();
  }

  return (
    <main className="min-h-screen bg-green-950">
      <section className="container p-4 mx-auto sm:p-6 md:p-10">
        {isAuthenticated && userRole === "admin" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={togglePopUp}
              className="px-4 py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div key={product.id || product.name}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {popUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Add New Product
            </h2>

            <form
              onSubmit={handleSubmit(handleCreateNewProduct)}
              className="space-y-4"
            >
              {/* Image URL Field */}
              <div className="grid items-center grid-cols-4 gap-4">
                <label
                  htmlFor="imageUrl"
                  className="col-span-1 text-right text-gray-700"
                >
                  Image URL:
                </label>
                <input
                  id="imageUrl"
                  type="text"
                  placeholder="image adrs muna wala pa backend"
                  className="col-span-3 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("imageCover", {
                    required: "Image URL is required",
                    pattern: {
                      value: /^(ftp|http|https):\/\/[^ "]+$/, // Basic URL validation
                      message: "Must be a valid URL",
                    },
                  })}
                />
                {errors.image && (
                  <p className="mt-1 text-xs italic text-right text-red-500 col-span-full">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Price Field */}
              <div className="grid items-center grid-cols-4 gap-4">
                <label
                  htmlFor="price"
                  className="col-span-1 text-right text-gray-700"
                >
                  Price:
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="e.g., ₱500"
                  step="0.01"
                  className="col-span-3 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0.01,
                      message: "Price must be greater than 0",
                    },
                    valueAsNumber: true,
                  })}
                />
                {errors.price && (
                  <p className="mt-1 text-xs italic text-right text-red-500 col-span-full">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Product Name Field */}
              <div className="grid items-center grid-cols-4 gap-4">
                <label
                  htmlFor="productName"
                  className="col-span-1 text-right text-gray-700"
                >
                  Name:
                </label>
                <input
                  id="productName"
                  type="text"
                  placeholder="e.g., Salty Pizza"
                  className="col-span-3 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name", {
                    required: "Product name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs italic text-right text-red-500 col-span-full">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-8 space-x-3">
                <button
                  type="button"
                  onClick={togglePopUp}
                  className="px-4 py-2 font-semibold text-white transition duration-200 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white transition duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
