import { instance } from "../http/http.service";
import qs from 'qs'
export const locationsApi = {
  getAll(pageNumber, pageSize) {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize
    }
    return instance
      .get(`Locations/GetAll${qs.stringify(params, { addQueryPrefix: true })}`)
      .then((response) => response.data);
  },
  getById(id) {
    return instance
      .get(`Locations/GetById?Id=${id}`)
      .then((response) => response.data);
  },
  getFilter({ name, type, measurement }) {
    const params = {
      Name: name,
      Type: type,
      Measurements: measurement,
    }
    return instance.get(
      `Locations/Filter?${qs.stringify(params)}`
    );
  },
  postCreateLocation(data) {
    return instance.post(`Locations/Create`, { data }).then((res) => res.data);
  },
  deleteLocation(id) {
    return instance
      .delete(`Locations/Delete?Id=${id}`)
      .then((response) => response.data);
  },
  putLocationUpdate(data) {
    return instance
      .put(`Locations/Update`, { data })
      .then((response) => response.data);
  },
};
