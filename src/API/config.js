import axios from 'axios';
import env from "react-dotenv";
const api = axios.create({
    withCredentials: true,
    baseURL: `https://wpedd1.api.infobip.com`,
    headers:{
      Authorization: window.env.API_KEY,
      Accept:'application/json'
    }
 });

 
 export default api;