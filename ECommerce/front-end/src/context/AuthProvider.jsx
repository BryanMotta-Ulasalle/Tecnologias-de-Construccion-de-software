import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginRequest, getMe } from "../features/Autentication/api/AuthApi";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user
    const isAdmin = user?.role?.name === "Admin"
    const isEmployee = user?.role?.name === "Employee"
    const isCustomer = user?.role?.name === "Customer"

    const login = async (credentials) => {
        setIsLoading(true)

        try {
            const token = await loginRequest(credentials)

            localStorage.setItem("access", token.access)
            localStorage.setItem("refresh", token.refresh)

            const me = await getMe()
            setUser(me)

            return me
        } catch (error) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            setUser(null);
            throw error
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    }

    useEffect(() => {
        const restoreSession = async () => {
            const token = localStorage.getItem("access")

            if (!token) {
                setUser(null)
                setIsLoading(false)
                return;
            }

            try {
                const me = await getMe()
                setUser(me)
            } catch (error) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                setUser(null);
                throw error
            } finally {
                setIsLoading(false);
            }
        }

        restoreSession()

    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        isAdmin,
        isCustomer,
        isEmployee,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider
