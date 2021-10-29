import axios from "axios";
import store from "../store";
import { logout } from "../store/modules/login/actions";
import { getSavedState, removeState } from "../utils/localStorage";

<<<<<<< HEAD
const baseURL =
  window.location.href.indexOf("hml.app") >= 0 ||
  window.location.href.indexOf("localhost") >= 0
    ? "https://jungle-api-hml-ozjujigmba-uc.a.run.app/"
    : process.env.REACT_APP_API_BASE_URL;
=======
const baseURL = window.location.href === 'http://homologacao.app.junglexp.com.br/' ? 'https://jungle-api-hml-ozjujigmba-uc.a.run.app/' : process.env.REACT_APP_API_BASE_URL
>>>>>>> origin/jungle-collaborator

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(function (config) {
<<<<<<< HEAD
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
=======
  const token = getSavedState('auth.token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    alert('Token expirado')
    removeState('auth.token')
    store.dispatch(logout())
    document.location.reload()
  }
  return Promise.reject(error);
});

>>>>>>> origin/jungle-collaborator

export default api;
