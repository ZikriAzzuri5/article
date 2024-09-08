import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createArticle = (articleData) => {
  return axios.post(`${API_URL}/articles`, articleData);
};

export const getArticles = () => {
  return axios.get(`${API_URL}/articles`);
};

export const getArticleBySlug = (slug) => {
  return axios.get(`${API_URL}/articles/${slug}`);
};

export const createCategory = (categoryData) => {
  return axios.post(`${API_URL}/categories`, categoryData);
};

export const getCategories = () => {
  return axios.get(`${API_URL}/categories`);
};

export const getCategoryById = (id) => {
  return axios.get(`${API_URL}/categories/${id}`);
};

export const updateCategory = (id, categoryData) => {
  return axios.put(`${API_URL}/categories/${id}`, categoryData);
};

export const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/categories/${id}`);
};
