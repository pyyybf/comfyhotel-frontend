import axios from "axios";

// create an axios instance
const HttpRequest = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://ec2-35-92-191-64.us-west-2.compute.amazonaws.com:8001' : 'http://localhost:8001',
    withCredentials: true
})

export default HttpRequest;