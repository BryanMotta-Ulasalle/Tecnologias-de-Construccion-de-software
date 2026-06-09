import apiClient from "../../../api/client";

export const fetchProducts = async () => {
    const {data} = await apiClient.get('/products/');
    return data;
}

export const fetchProductById = async (id) => {
    const {data} = await apiClient.get(`/products/${id}/`);
    return data;
}

