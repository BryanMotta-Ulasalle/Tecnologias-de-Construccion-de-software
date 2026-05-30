import { createApiClient, setApiAccessToken } from './apiClient'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api'

const api = createApiClient({
  baseURL: API_BASE_URL,
  serviceName: 'ecommerce-api',
})

const normalizeProduct = (product) => {
  const mainImage = product.product_images?.find((image) => image.is_main) ?? product.product_images?.[0]

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price ?? 0),
    stock: product.stock,
    status: product.status,
    image: mainImage?.image_url ?? 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1000&h=1200&fit=crop&auto=format',
    category: product.category?.name ?? 'General',
    rating: Number(product.rating ?? 0),
    reviews: Number(product.reviews ?? 0),
  }
}

export const ecommerceApi = {
  setAccessToken(token) {
    setApiAccessToken(token)
  },

  async login({ email, password }) {
    const response = await api.post('/auth/login/', { email, password })
    return response.data
  },

  async register({ name, email, password, roleId }) {
    const payload = { name, email, password }
    if (roleId) {
      payload.role_id = roleId
    }
    const response = await api.post('/auth/register/', payload)
    return response.data
  },

  async getCurrentUser() {
    const response = await api.get('/users/me/')
    return response.data
  },

  async getProducts() {
    const response = await api.get('/products/')
    return response.data.map(normalizeProduct)
  },

  async getCategories() {
    const response = await api.get('/categories/')
    return response.data
  },

  async getCart() {
    const response = await api.get('/carts/')
    const cart = response.data?.[0]

    if (!cart) {
      return {
        id: null,
        items: [],
        total_price: 0,
      }
    }

    return {
      ...cart,
      items: (cart.items ?? []).map((item) => ({
        ...item,
        product: normalizeProduct(item.product),
      })),
      total_price: Number(cart.total_price ?? 0),
    }
  },

  async addOrUpdateCartItem({ cartItems, productId }) {
    const existing = cartItems.find((item) => item.product.id === productId)

    if (existing) {
      await api.patch(`/cart-items/${existing.id}/`, { quantity: existing.quantity + 1 })
      return
    }

    await api.post('/cart-items/', { product_id: productId, quantity: 1 })
  },

  async deleteCartItem(cartItemId) {
    await api.delete(`/cart-items/${cartItemId}/`)
  },

  async getOrders() {
    const response = await api.get('/orders/')
    return response.data
  },

  async createOrder({ shippingAddress }) {
    const response = await api.post('/orders/', { shipping_address: shippingAddress })
    return response.data
  },

  async getUsers() {
    const response = await api.get('/users/')
    return response.data
  },
}
