import { instance } from "../http/http.service";
import qs from 'qs';

const successResponseHandler = (res) => res.data;

export const characterApi = {
  getAll(pageNumber, pageSize) {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize
    }
    return instance
      .get(`Characters/GetAll${qs.stringify(params, { addQueryPrefix: true })}`, )
      .then(successResponseHandler);
  },
  getById(id) {
    return instance
      .get(`Characters/GetById?Id=${id}`)
      .then(successResponseHandler);
  },
  getFilter({name, status, gender}) {
    const request = {
      params: {
        Name: name ? name : null,
        Status: status.length>0 ? status : [0, 1, 2],
        Gender: gender.length>0 ? gender : [0, 1, 2],
      },
      paramsSerializer: params=> {
        return qs.stringify(params)
      }
    }
    return instance.get(
      `Characters/Filter`, request
    );

  },
  postCreateCharacter(data) {
    return instance.post(`Characters/Create`, { data }).then(successResponseHandler);
  },
  deleteCharacter(id) {
    return instance
      .delete(`Characters/Delete?Id=${id}`)
      .then(successResponseHandler);
  },
  putCharacterUpdate(data) {
    return instance
      .put(`Characters/Update`, { data })
      .then(successResponseHandler);
  },
};
