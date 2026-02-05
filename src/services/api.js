import axios from "axios";

export const api = axios.create({
    // baseURL: 'https://api.weddinglist.com.br',
    baseURL: 'http://localhost:4040'
})
