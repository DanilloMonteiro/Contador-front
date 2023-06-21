import Api from "./api";

const ContadorServices = {
  index: () => Api.get("/"),
  update: (id, params) => Api.put(`/${id}`, params),
};

export default ContadorServices;
