import axios from "axios";

export const api=axios.create({
    baseURL:"http://localhost:8080",

});

// INTERCEPTORS WILL RUN WITH ALL THE REQUEST
// YOU CAN MODIFY CONFIGURATION USING INTERCEPTORS
// WE WILL ADD TOKEN WITH EACH AND EVERY REQUEST WHICH WE HAVE STORE IN LOCALSTORAGE
api.interceptors.request.use(
    (config) => {
        const token=localStorage.getItem("token");
        if (token) config.headers.Authorization=`Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);