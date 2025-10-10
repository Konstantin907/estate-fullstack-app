import axios from 'axios';


const apiRequest = axios.create({
    baseURL: import.meta.VITE_API_URL || 'http://localhost:8800/api',
    withCredentials: true,
})

export default apiRequest;