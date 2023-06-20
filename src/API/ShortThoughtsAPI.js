import api from "./config";

export const ShortThoughtsAPI = {
  getAll: async function () {
    const res = await api
      .request({
        url: `/catalogs/1/catalogs/10726/items`,
        method: "GET",
      })
      .catch((err) => {
        window.alert("Failed to fetch data!");
        console.log(err);
      });
    return res.data.results;
  },

  updateItem: async function (id, data) {
    await api
      .request({
        url: `/catalogs/1/catalogs/10726/items/${id}`,
        method: "PATCH",
        data: data,
      })
      .then((response) => {
        // window.alert("Updated successfully!");
        console.log(response);
      })
      .catch((error) => {
        window.alert("An error has occured!");
        console.log(error);
      });
  },

  addItem: async function (data) {
    await api
      .request({
        url: `/catalogs/1/catalogs/10726/items`,
        method: "POST",
        data: data,
      })
      .then((res) => {
        window.alert("Item added!");
        console.log(res);
      })
      .catch((error) => {
        window.alert("Failed to add item!");
        console.log(error);
      });
  },

  deleteItem: async function (id) {
    await api
      .request({
        url: `/catalogs/1/catalogs/10726/items/${id}`,
        method: "DELETE",
      })
      .then((res) => {
        window.alert(`Item no. ${id} deleted successfully!`);
        console.log(res);
      })
      .catch((error) => {
        window.alert("An error has occured");
        console.log(error);
      });
  },
};
