import axios from 'axios';

const api = axios.create({
    //baseURL: "https://admin-portal-over.herokuapp.com"
    baseURL: "http://localhost:8080"
})

api.interceptors.request.use(async config => {
   let response = localStorage.getItem("over_token");
   
   if(response) {
        var token = `Bearer ${response}`;
        config.headers.Authorization = token;
   }

    return config;
})

export default api;