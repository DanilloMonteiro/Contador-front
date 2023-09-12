import Api from "./api";

const BoardServices = {
  index: () => Api.get("/boards"),
  create: (params) => Api.post("/boards", params),
  update: (id, params) => Api.put(`/boards/${id}`, params),
  delete: (id) => Api.delete(`/boards/${id}`),
};

export default BoardServices;
