import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080/api'; // Direct URL - CORS configured in WebConfig.java

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API services
export const menuAPI = {
    getAll: () => axiosInstance.get('/menu'),
    getById: (id: number) => axiosInstance.get(`/menu/${id}`),
    create: (data: any) => axiosInstance.post('/menu', data),
    update: (id: number, data: any) => axiosInstance.put(`/menu/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/menu/${id}`),
    updateAvailability: (id: number, available: boolean) =>
        axiosInstance.patch(`/menu/${id}/availability`, { available }),
};

export const categoriesAPI = {
    getAll: () => axiosInstance.get('/categories'),
    getById: (id: number) => axiosInstance.get(`/categories/${id}`),
    create: (data: any) => axiosInstance.post('/categories', data),
    update: (id: number, data: any) => axiosInstance.put(`/categories/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/categories/${id}`),
};

export const reservationsAPI = {
    getAll: () => axiosInstance.get('/reservations'),
    getById: (id: number) => axiosInstance.get(`/reservations/${id}`),
    create: (data: any) => axiosInstance.post('/reservations', data),
    update: (id: number, data: any) => axiosInstance.put(`/reservations/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/reservations/${id}`),
    updateStatus: (id: number, status: string) =>
        axiosInstance.patch(`/reservations/${id}/status`, { status }),
};

export const ordersAPI = {
    getAll: () => axiosInstance.get('/orders'),
    getById: (id: number) => axiosInstance.get(`/orders/${id}`),
    create: (data: any) => axiosInstance.post('/orders', data),
    delete: (id: number) => axiosInstance.delete(`/orders/${id}`),
    updateStatus: (id: number, status: string) =>
        axiosInstance.patch(`/orders/${id}/status`, { status }),
};

export const tablesAPI = {
    getAll: () => axiosInstance.get('/tables'),
    getById: (id: number) => axiosInstance.get(`/tables/${id}`),
    create: (data: any) => axiosInstance.post('/tables', data),
    update: (id: number, data: any) => axiosInstance.put(`/tables/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/tables/${id}`),
    updateAvailability: (id: number, available: boolean) =>
        axiosInstance.patch(`/tables/${id}/availability`, { available }),
};