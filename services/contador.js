import Api from "./api";

const ContadorServices = {
  index: () => Api.get("/"),
  create: (params) => Api.post("/", params),
  update: (id, params) => Api.put(`/${id}`, params),
};

export default ContadorServices;
