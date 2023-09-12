import Api from "./api";

const ContadorServices = {
  index: () => Api.get("/rows"),
  find: (table) => Api.get(`/rows/table/${table}`),
  create: (params) => Api.post("/rows", params),
  update: (id, params) => Api.put(`/rows/${id}`, params),
};

export default ContadorServices;
