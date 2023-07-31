import Api from "./api";

const NotificationServices = {
  index: () => Api.get("/notifications"),
  create: (params) => Api.post("/notifications", params),
  update: (id, params) => Api.put(`/notifications/${id}`, params),
  delete: (id) => Api.delete(`/notifications/${id}`),
};

export default NotificationServices;
