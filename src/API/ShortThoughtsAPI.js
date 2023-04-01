import api from './config';
export const ShortThoughtsAPI = {
    getAll: async function() {
        const res = await api.request({
            url:`/catalogs/1/catalogs/10726/items`,
            method:'GET',
         
    
         });

         return res.data.results;
        
    },

    updateItem: async function(id, data) {
      await api.request({
          url:`/catalogs/1/catalogs/10726/items/${id}`,
          method:'PATCH',
          data: data,
      })

  }

}