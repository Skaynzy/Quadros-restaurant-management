import useCartStore from "../../store/useCartStore";
import useAuthStore from "../../store/useAuthStore";
import useProductsStore from "../../store/useProductsStore";
import ProdButton from "./ProdButton";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom"; 



const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const { deleteProduct } = useProductsStore();
  const navigate = useNavigate();

  //verify if user is logged in. Redirect if not
  const verifyAddToCart = () =>{
    if (isAuthenticated){
      addToCart(product)
    } else {
      navigate("/login");
    }

  }
  
  
  return (
    <div className="relative overflow-hidden bg-white rounded-md shadow-md">
      <div className="relative w-full h-48 md:h-64">
        <img
          className="object-cover w-full h-full"
          src={product.imageCover}
          alt="Pizza"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 overflow-hidden text-lg font-semibold text-gray-800 text-ellipsis text-nowrap">
          {product.name}
        </h2>
        <p className="mb-3 text-sm text-gray-600">₱{product.price}</p>
        {isAuthenticated && userRole === "admin" ? null : (
          <ProdButton
            buttonName={"Add to Cart"}
            buttonClick={verifyAddToCart}
            product={product}
          />
        )}
      </div>
      {isAuthenticated && userRole === "admin" && (
        <div>
          <Trash
            onClick={() => deleteProduct(product.id)}
            className="hover:cursor-pointer"
            color="red"
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
