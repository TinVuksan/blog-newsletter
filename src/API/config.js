import axios from 'axios';
const api = axios.create({
    withCredentials: true,
    baseURL: `https://wpedd1.api.infobip.com`,
    headers:{
      post: {
        "Content-Type": "application/json",
        "Authorization": process.env.REACT_APP_APIKEY,
        "Accept":"application/json",
      },
      get: {
        "Authorization": process.env.REACT_APP_APIKEY,
        "Accept": "application/json",
      },
      delete: {
        "Authorization": process.env.REACT_APP_APIKEY,
        "Accept":"application/json",
      },
      patch: {
        "Content-Type": "application/json",
        "Authorization": process.env.REACT_APP_APIKEY,
        "Accept":"application/json",
      }
      
    }
 });

 
 export default api;