import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'content-type': 'application/json',
    }
})

export default AxiosClient