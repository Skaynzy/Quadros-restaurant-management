import useCartStore from "../../store/useCartStore";
import useAuthStore from "../../store/useAuthStore";
import ProdButton from "./ProdButton";
import { useNavigate } from "react-router-dom"; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const navigate = useNavigate();

  //verify if user is logged in. Redirect if not
  const verifyAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      navigate("/login");
    }
  };
  
  return (
    <div className="relative overflow-hidden bg-white rounded-md shadow-md">
      <div className="relative w-full h-48 md:h-64">
        <img
          className="object-cover w-full h-full"
          src={product.imageCover}
          alt={product.name}
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 overflow-hidden text-lg font-semibold text-gray-800 text-ellipsis text-nowrap">
          {product.name}
        </h2>
        <p className="mb-3 text-sm text-gray-600">₱{product.price}</p>
        {/* Only show Add to Cart button for non-admin users */}
        {(!isAuthenticated || userRole !== "admin") && (
          <ProdButton
            buttonName={"Add to Cart"}
            buttonClick={verifyAddToCart}
            product={product}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;