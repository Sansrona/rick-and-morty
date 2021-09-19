import { instance } from "../http/http.service";

export const imagesApi = {
  postUploadImage(file) {
    return instance.post(`ImageUpload/Upload`, { file });
  },
  deleteImage(name) {
    return instance.delete(`ImageUpload/Delete?name=${name}`);
  },
};
