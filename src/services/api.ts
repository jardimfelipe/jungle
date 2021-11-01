import axios from "axios";
import store from "../store";
import { logout } from "../store/modules/login/actions";
import { getSavedState, removeState } from "../utils/localStorage";

let baseURL = "";

if (
  window.location.href.indexOf("hml.app.junglexp.com.br") >= 0 ||
  window.location.href.indexOf("localhost") >= 0
)
  baseURL = "https://jungle-api-hml-ozjujigmba-uc.a.run.app/";

if (window.location.hostname === "app.junglexp.com.br")
  baseURL = "https://jungle-api-ozjujigmba-uc.a.run.app/";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(function (config) {
  const token = getSavedState("auth.token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      alert("Token expirado");
      removeState("auth.token");
      store.dispatch(logout());
      document.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
