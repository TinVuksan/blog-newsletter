import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: `https://wpedd1.api.infobip.com`,
    headers:{
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
      Accept:'application/json',
      
      
    }
 });

 
 export default api;