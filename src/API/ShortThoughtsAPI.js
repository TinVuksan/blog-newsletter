import api from './config';
export const ShortThoughtsAPI = {
    getAll: async function() {
        const res = await api.request({
            url:`/catalogs/1/catalogs/10726/items`,
            method:'GET',
            responseType:'json'
    
         });

         return res.data.results;
        
    }

}