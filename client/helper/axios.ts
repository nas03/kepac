import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5500/api"
      : "https://kepac.onrender.com/api",
});

export default api;
