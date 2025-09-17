import axios from "axios";
import { ACCESS_TOKEN } from "./Constants";
import { Navigate } from "react-router-dom";

const api = axios.create({
    baseURL: "https://backend.mahbaprint.online/",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            alert("يجب ان تسجل الدخول من جديد...");
            window.location.href = "/login";
        }
        return Promise.reject(error); // Pass the error along
    }
);

export default api;
