import axios from 'axios';

const API_URL = 'http://127.0.0.1:5002';

export const userApi = axios.create({ baseURL: API_URL });

export const getProducts = async () => {
    try {
        const response = await userApi.get('/productos');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;

    }
}

export const createProduct = async (productData) => {
    try {
        const response = await userApi.post('/productos', productData); 
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }   
}
