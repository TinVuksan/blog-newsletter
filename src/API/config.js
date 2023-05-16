import axios from 'axios';
const api = axios.create({
    withCredentials: true,
    baseURL: `https://wpedd1.api.infobip.com`,
    headers:{
      post: {
        "Content-Type": "application/json",
        "Authorization": "App 945c9bf931ea370b1d86d8e01ef4a302-b29943ca-b359-4fb3-b200-a94232ee495f",
        "Accept":"application/json",
      },
      get: {
        "Authorization": "App 945c9bf931ea370b1d86d8e01ef4a302-b29943ca-b359-4fb3-b200-a94232ee495f",
        "Accept": "application/json",
      },
      delete: {
        "Authorization": "App 945c9bf931ea370b1d86d8e01ef4a302-b29943ca-b359-4fb3-b200-a94232ee495f",
        "Accept":"application/json",
      },
      patch: {
        "Content-Type": "application/json",
        "Authorization": "App 945c9bf931ea370b1d86d8e01ef4a302-b29943ca-b359-4fb3-b200-a94232ee495f",
        "Accept":"application/json",
      }
      
    }
 });

 
 export default api;