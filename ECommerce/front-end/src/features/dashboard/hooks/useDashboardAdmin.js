import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../../api/errors";
import { fetchCategories } from "../../Home/api/categoryApi";
import { fetchOrders } from "../../orders/api/orderApi";
import { fetchProducts } from "../../products/api/productsApi";
import { fetchUsersAdmin } from "../../users/api/adminUsersApi";

const useDashboardAdmin = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [products, categories, orders, users] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
          fetchOrders(),
          fetchUsersAdmin(),
        ]);

        if (isActive) {
          setData({ products, categories, orders, users });
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            getApiErrorMessage(
              requestError,
              "No se pudo cargar el resumen administrativo.",
            ),
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  return { data, isLoading, error };
};

export default useDashboardAdmin;
