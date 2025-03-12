import axios from "axios";
// http://localhost:4040

export const api = axios.create({
    baseURL: 'https://api.weddinglist.com.br',
})
