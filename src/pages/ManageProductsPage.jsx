import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useProductsStore from "../store/useProductsStore";
import {
  Package,
  Plus,
  Trash2,
  X,
  PhilippinePeso,
  Image as ImageIcon,
  Tag,
} from "lucide-react";

const ManageProductsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create', 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = useProductsStore((state) => state.products);
  const { addProduct, deleteProduct } = useProductsStore();

  // React hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreateProduct = () => {
    setModalType("create");
    setShowModal(true);
    reset();
  };

  const handleDeleteProduct = (product) => {
    setModalType("delete");
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Renamed this function to avoid conflict with React Hook Form's handleSubmit
  const onSubmitForm = (data) => {
    const dataWithId = { 
      id: products.length + 1, 
      ...data,
      images: [] // Default empty images array
    };
    addProduct(dataWithId);
    setShowModal(false);
    reset();
  };

  const handleDeleteConfirm = () => {
    deleteProduct(selectedProduct.id);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-green-950 p-6 pt-9">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Product Management
          </h1>
          <p className="text-green-300">
            Manage your restaurant's menu items and products
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-800/50 p-3 rounded-lg">
                <Package className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {products.length}
                </div>
                <div className="text-green-300">Total Products</div>
              </div>
            </div>
            
            {/* Add Product Button */}
            <button
              onClick={handleCreateProduct}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-green-900/30 border border-green-800/50 rounded-lg overflow-hidden hover:bg-green-900/40 transition-colors"
            >
              <div className="relative h-48">
                <img
                  src={product.imageCover}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-green-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-400">
                    ₱{product.price}
                  </span>
                  <span className="text-xs text-green-300">
                    ID: {product.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-green-900 border border-green-800 rounded-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-green-800">
                <h3 className="text-lg font-semibold text-white">
                  {modalType === "create" && "Add New Product"}
                  {modalType === "delete" && "Delete Product"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-green-400 hover:text-green-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {modalType === "delete" ? (
                  <div className="text-center">
                    <div className="text-red-400 mb-4">
                      <Trash2 className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-white mb-2">
                      Are you sure you want to delete this product?
                    </p>
                    <p className="text-green-300 text-sm mb-4">
                      {selectedProduct?.name} - ₱{selectedProduct?.price}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 bg-green-800/50 text-green-300 rounded-lg hover:bg-green-800/70 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        <Tag className="w-4 h-4 inline mr-1" />
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Double Cheeseburger"
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register("name", {
                          required: "Product name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe your product..."
                        rows="3"
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        {...register("description", {
                          required: "Description is required",
                        })}
                      />
                      {errors.description && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        <PhilippinePeso className="w-4 h-4 inline mr-1" />
                        Price (₱)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 250"
                        step="0.01"
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        <p className="mt-1 text-xs text-red-400">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        <ImageIcon className="w-4 h-4 inline mr-1" />
                        Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register("imageCover", {
                          required: "Image URL is required",
                          pattern: {
                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                            message: "Must be a valid URL",
                          },
                        })}
                      />
                      {errors.imageCover && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.imageCover.message}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 bg-green-800/50 text-green-300 rounded-lg hover:bg-green-800/70 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProductsPage;