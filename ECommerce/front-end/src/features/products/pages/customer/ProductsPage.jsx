import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../../../../components/ErrorMessage";
import LoadingState from "../../../../components/LoadingState";
import useAuth from "../../../../hooks/useAuth";
import useAddToCart from "../../../orders/hooks/useAddToCart";
import ProductGrid from "../../components/customer/ProductGrid";
import useProducts from "../../hooks/useProducts";

const ProductsPage = () => {
  const { products, isLoading, error } = useProducts();
  const {
    addToCart,
    error: addError,
  } = useAddToCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    try {
      await addToCart(productId);
    } catch {
      // El hook expone el mensaje debajo del catalogo.
    }
  };

  if (isLoading) return <LoadingState message="Cargando productos..." />;
  if (error) return <ErrorMessage message={error} className="m-5" />;

  return (
    <main className="bg-bgLight">
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      <ErrorMessage message={addError} className="mx-5 mb-8" />
    </main>
  );
};

export default ProductsPage;
