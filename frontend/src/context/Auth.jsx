import * as React from 'react';
import { api as axios } from '../services/api';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {

    const [user, setUser] = React.useState(null);

    // !! = short way to cast a variable to be a boolean
    const isAuthenticated = !!user;

    // Check if user is authenticated and refresh user state
    // This wil be call when user refreh the page
    React.useEffect(() => {

        const token = localStorage.getItem('authtoken');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        if (!!token) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth-data`, { headers })
                .then((response) => {
                    setUser(response.data.user);
                })

        }

    }, []);

    async function signIn(formData) {

        try {

            const response = await axios({
                url: `${import.meta.env.VITE_BACKEND_URL}/signin`,
                method: 'POST',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData)
            });

            console.log(response.data)

            localStorage.setItem("authtoken", response.data.token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            setUser(response.data.user);

            window.location = "internal/dashboard";


        } catch (error) {

            throw error;

        }
    }

    async function signOut() {

        // Get token
        const token = localStorage.getItem('authtoken');

        try {

            const response = await axios({
                url: `${import.meta.env.VITE_BACKEND_URL}/signout`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.removeItem('authtoken');

            setUser(null);

            window.location = "/login";

        } catch (error) {

            console.log(error);

        }

    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook
export function useAuth() {
    return React.useContext(AuthContext);
}

