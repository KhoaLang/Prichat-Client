import Axios from "axios";

export class baseService {
  //put json về phía backend
  put = (url, model) => {
    return Axios({
      url: `${process.env.REACT_APP_API_URL}${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(`${process.env.REACT_APP_TOKEN}`),
      }, //JWT
    });
  };
  patch = (url, model) => {
    return Axios({
      url: `${process.env.REACT_APP_API_URL}${url}`,
      method: "PATCH",
      data: model,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(`${process.env.REACT_APP_TOKEN}`),
      }, //JWT
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${process.env.REACT_APP_API_URL}${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(`${process.env.REACT_APP_TOKEN}`),
      }, //JWT
    });
  };

  get = (url) => {
    return Axios({
      url: `${process.env.REACT_APP_API_URL}${url}`,
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(`${process.env.REACT_APP_TOKEN}`),
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = (url) => {
    return Axios({
      url: `${process.env.REACT_APP_API_URL}${url}`,
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(`${process.env.REACT_APP_TOKEN}`),
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
