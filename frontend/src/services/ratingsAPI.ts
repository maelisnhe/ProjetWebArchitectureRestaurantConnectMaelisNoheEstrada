import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080/api';

export const menuItemsAPI = {
    getAll: (params?: { category?: string; vegetarian?: boolean }) =>
        axios.get(`${API_BASE_URL}/menu-items`, { params }),

    getById: (id: number) =>
        axios.get(`${API_BASE_URL}/menu-items/${id}`),

    create: (data: any) =>
        axios.post(`${API_BASE_URL}/menu-items`, data),

    update: (id: number, data: any) =>
        axios.put(`${API_BASE_URL}/menu-items/${id}`, data),

    delete: (id: number) =>
        axios.delete(`${API_BASE_URL}/menu-items/${id}`)
};

export const ratingsAPI = {
    create: (data: { menuItem: { id: number }; rating: number; user: { id: number } }) =>
        axios.post(`${API_BASE_URL}/ratings`, data),

    getAll: () =>
        axios.get(`${API_BASE_URL}/ratings`),

    getByMenuItem: (menuItemId: number) =>
        axios.get(`${API_BASE_URL}/ratings/menu-item/${menuItemId}`),

    getAverageByMenuItem: (menuItemId: number) =>
        axios.get(`${API_BASE_URL}/ratings/menu-item/${menuItemId}/average`),

    update: (id: number, data: { rating: number }) =>
        axios.patch(`${API_BASE_URL}/ratings/${id}`, data)
};
