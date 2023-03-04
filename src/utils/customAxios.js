import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.Authorization = JSON.parse(localStorage.getItem("signinToken"));

export default axios;
