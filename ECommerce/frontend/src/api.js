const BASE = import.meta.env.VITE_API_BASE || '/api'

function authHeaders() {
  const token = localStorage.getItem('accessToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function setToken(token) {
  localStorage.setItem('accessToken', token)
}

export function getToken() {
  return localStorage.getItem('accessToken')
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products/`, { headers: { Accept: 'application/json' } })
  return res.json()
}

export async function addCartItem(product_id, quantity) {
  const res = await fetch(`${BASE}/cart-items/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ product_id, quantity })
  })
  return res.json()
}

export async function fetchCart() {
  const res = await fetch(`${BASE}/carts/`, { headers: { Accept: 'application/json', ...authHeaders() } })
  return res.json()
}

export async function createOrder(shipping_address) {
  const res = await fetch(`${BASE}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ shipping_address })
  })
  return res.json()
}

export default { login, fetchProducts, addCartItem, fetchCart, createOrder }
