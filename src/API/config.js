import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: `https://wpedd1.api.infobip.com`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'App d311821005b7f5b2b56d0f1f8e1907ae-da128bef-0837-43cb-9078-460fad92dd73'
    },
 });
 
 export default api;