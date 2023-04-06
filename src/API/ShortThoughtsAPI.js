import api from './config';

export const ShortThoughtsAPI = {
    getAll: async function() {
        const res = await api.request({
            url:`/catalogs/1/catalogs/10726/items`,
            method:'GET',
         }).catch((err) => {
          window.alert("Failed to fetch data!");
          console.log(err);
         });
          return res.data.results;  

    },

    updateItem: async function(id, data) {
      await api.request({
          url:`/catalogs/1/catalogs/10726/items/${id}`,
          method:'PATCH',
          data: data
      }).then((response) => {
        console.log("Izvršeno: ", response);
      }).catch((error) => {
        console.log("Greška: ", error);
      });

    },

    addItem: async function(data) {
      await api.request({
        url:`/catalogs/1/catalogs/10726/items`,
        method:'POST',
        data:data
      }).then((res) => {
        console.log("Item added!", res)
      }).catch((error) => {
        console.log("Failed to add item", error);
      });
      
    },

    deleteItem: async function(id) {
      await api.request({
        url:`/catalogs/1/catalogs/10726/items/${id}`,
        method:'DELETE'
      }).then((res) => {
        console.log("Deleted successfully", res);
      }).catch((error) => {
        console.log(error);
      });

    },

}