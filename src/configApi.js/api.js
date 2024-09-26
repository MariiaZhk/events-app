import axios from "axios";

export const api = axios.create({
  baseURL: "https://events-app-backend-0t2b.onrender.com",
});
