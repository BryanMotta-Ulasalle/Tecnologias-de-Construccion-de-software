import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../../api/errors";
import { fetchProducts } from "../api/productsApi";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const productData = await fetchProducts();
        if (isMounted) setProducts(productData);
      } catch (requestError) {
        if (isMounted) {
          setError(
            getApiErrorMessage(
              requestError,
              "No se pudieron cargar los productos.",
            ),
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  const refetch = () => setReloadKey((current) => current + 1);

  return { data: products, products, isLoading, error, refetch };
};

export default useProducts;
