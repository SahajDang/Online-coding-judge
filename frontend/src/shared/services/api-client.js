import axios from "axios";

export const api = axios.create({
    baseURL : import.meta.env.VITE__API_URL || "http://localhost:7777/",
    timeout : 10000
});

