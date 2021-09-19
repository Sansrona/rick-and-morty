import * as axios from "axios";

const Token = "today";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "http://173.249.20.184:7001/api/",
  headers: {
    Authorization: "Bearer " + Token,
  },
});
