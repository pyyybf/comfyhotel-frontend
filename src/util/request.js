import axios from "axios";

// create an axios instance
const HttpRequest = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8001',
    withCredentials: true
})

export default HttpRequest;