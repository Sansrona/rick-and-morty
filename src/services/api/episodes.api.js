import { instance } from "../http/http.service";
import  qs from 'qs';

export const episodesApi = {
  getAll({pageNumber, pageSize,season}) {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize,
      Season: season
    }
    return instance
      .get(`/Episodes/GetAll${qs.stringify(params, { addQueryPrefix: true })}`)
      .then((res) => res.data);
  },
  getById(id) {
    return instance.get(`Episodes/GetById?Id=${id}`).then((res) => res.data);
  },
  getByName(name) {
    return instance
      .get(`Episodes/GetByName?Name=${name}`)
      .then((res) => res.data);
  },
  postCreateEpisode(data) {
    return instance.post(`Episodes/Create`, { data }).then((res) => res.data);
  },
  deleteEpisode(id) {
    return instance.delete(`Episodes/Delete?Id=${id}`).then((res) => res.data);
  },
  putUpdateEpisode(data) {
    return instance.put(`Episodes/Update`, { data }).then((res) => res.data);
  },
  postCharactersInEpisode(data) {
    return instance.post(`Episodes/AddCharactersInEpisode`, { data });
  },
  deleteCharactersFromEpisode(data) {
    return instance.delete(`Episodes/AddCharactersFromEpisode`, { data });
  },
};
