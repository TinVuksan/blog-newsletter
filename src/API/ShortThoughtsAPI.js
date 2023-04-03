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
          data: data
      });
  },

    addItem: async function(data) {
      await api.request({
        url:`/catalogs/1/catalogs/10726/items`,
        method:'POST',
        data:data
      });
    },

    deleteItem: async function(id) {
      await api.request({
        url:`/catalogs/1/catalogs/10726/items/${id}`,
        method:'DELETE'
      });
      alert(`Thought no. ${id} successfully deleted!`);
      
    }

}