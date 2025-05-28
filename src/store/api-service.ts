import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const registerUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: registerUser,
        onError: (error) => {
            console.error('Registration error:', error);
        },
    });
}

export const authenticateUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const fetchUserData = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
};

export const fetchUserProfile = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};
