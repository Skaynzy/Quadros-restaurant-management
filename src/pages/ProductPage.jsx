import useProductsStore from "../store/useProductsStore";
import ProductCard from "../components/products/ProductCard";

const ProductPage = () => {
  const products = useProductsStore((state) => state.products);

  return (
    <main className="min-h-screen bg-green-950">
      <section className="container p-4 mx-auto sm:p-6 md:p-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div key={product.id || product.name}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductPage;