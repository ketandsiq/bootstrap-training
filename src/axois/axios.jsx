import axios from "axios";

const API = axios.create({
  baseURL: "https://your-api.com", // Replace with your API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If working with authentication cookies
});

export default API;
