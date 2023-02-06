import axios from "axios";

const host = axios.create({
    baseURL: 'http://localhost:7000/api/',
});

const interceptor = config => {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
}

host.interceptors.request.use(interceptor);

export {
    host,
}