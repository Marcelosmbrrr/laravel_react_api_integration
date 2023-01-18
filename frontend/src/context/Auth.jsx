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

        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get("http://localhost:8000/api/v1/auth-data", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    setUser(response.data.user);
                })

        }

    }, []);

    async function signIn(formData) {

        try {

            const response = await axios({
                url: "http://localhost:8000/api/v1/signin",
                method: 'POST',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData)
            });

            localStorage.setItem('access_token', response.data.token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            setUser(response.data.user);

            window.location = "internal/dashboard";


        } catch (error) {

            throw error;

        }
    }

    async function signOut() {

        // Get token
        const token = localStorage.getItem('access_token');

        try {

            const response = await axios({
                url: "http://localhost:8000/api/v1/signout",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.removeItem('access_token');

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

