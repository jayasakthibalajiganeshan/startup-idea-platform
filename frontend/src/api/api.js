import axios from "axios";

const API = axios.create({
  baseURL: "https://startup-idea-platform.onrender.com/api", // backend port 5000
});

export default API;
