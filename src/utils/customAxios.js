import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.Authorization = JSON.parse(localStorage.getItem("signinToken"));

console.log("custom axios", JSON.parse(localStorage.getItem("signinToken")))

export default axios;
