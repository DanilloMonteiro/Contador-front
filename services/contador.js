import Api from "./api";

const ContadorServices = {
  index: (params) =>
    Api.get(
      `/rows?table=${params.table}&line=${params.line}&customer=${params.customer}&fluig=${params.fluig}&highCount=${params.highCount}&lowCount=${params.lowCount}&color=${params.color}&digital=${params.digital}&material=${params.material}`
    ),
  find: (table) => Api.get(`/rows/table/${table}`),
  create: (params) => Api.post("/rows", params),
  update: (id, params) =>
    Api.put(
      `/rows/${id}?index=${params.index}&new_date=${params.new_date}&revType=${params.revType}`,
      params
    ),
};

export default ContadorServices;
