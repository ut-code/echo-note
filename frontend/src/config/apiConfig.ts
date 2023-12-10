export const API_BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/api";

export const BASE_URL = import.meta.env.GITHUB_ACTIONS
  ? import.meta.env.BASE_URL
  : "/";
