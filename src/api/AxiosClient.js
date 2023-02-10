import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
});

const AxiosClientMultiPart = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

export { AxiosClient, AxiosClientMultiPart }