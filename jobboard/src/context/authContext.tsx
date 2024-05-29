import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    user: any;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const fetchUser = async (token: string) => {
        setLoading(true); 
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/me?token=${token}`);
            const data = response.data;
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Fetch user error:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false); //Setting loading to false - when fetch is complete
        }
    };

    const checkAuth = () => {
        const token = Cookies.get('token');
        if (token) {
            fetchUser(token);
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false); 
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (token: string) => {
        Cookies.set('token', token, { expires: 1 });
        fetchUser(token) 
    };
    
    const logout = async () => {
        try {
            Cookies.remove('token');
            setIsAuthenticated(false);
            setUser(null);
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
