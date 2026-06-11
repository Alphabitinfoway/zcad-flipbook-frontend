import axios from "axios";

export const baseURL =
  "http://localhost:5000/api";

export default axios.create({
  baseURL,
});