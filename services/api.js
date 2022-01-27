import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    //baseURL: "https://admin-portal-over.herokuapp.com"
    baseURL: "http://admin-app-over.herokuapp.com"
})

api.interceptors.request.use(async config => {

   let response = Cookies.getItem("over_token");
   
   if(response) {
        var token = `Bearer ${response}`;
        config.headers.Authorization = token;
   }

    return config;
})

export default api;