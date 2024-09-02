import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createArticle = (articleData) => {
  return axios.post(`${API_URL}/articles`, articleData);
};

export const getArticles = () => {
  return axios.get(`${API_URL}/articles`);
};
