import apiClient from "../../../api/client"

export const login = async (credentials) => {
    const {data} = await apiClient.post('/auth/login/', credentials)
    return data
}

export const register = async (credentials) => {
    const {data} = await apiClient.post('/auth/register/',credentials)
    return data
}

export const getMe = async () => {
    const {data} = await apiClient.get("/users/me/", { withAuth: true })
    return data
}
