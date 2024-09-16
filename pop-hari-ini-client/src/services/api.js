import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const createArticle = (articleData) => {
  return axios.post(`${API_URL}/api/articles`, articleData, getAuthHeaders());
};

export const getArticles = () => {
  return axios.get(`${API_URL}/api/articles`, getAuthHeaders());
};

export const getArticleBySlug = (slug) => {
  return axios.get(`${API_URL}/api/articles/${slug}`, getAuthHeaders());
};

export const updateArticle = (id, articleData) => {
  return axios.put(
    `${API_URL}/api/articles/${id}`,
    articleData,
    getAuthHeaders()
  );
};

export const deleteArticle = (id) => {
  return axios.delete(`${API_URL}/api/articles/${id}`, getAuthHeaders());
};

export const createCategory = (categoryData) => {
  return axios.post(
    `${API_URL}/api/categories`,
    categoryData,
    getAuthHeaders()
  );
};

export const getCategories = () => {
  return axios.get(`${API_URL}/api/categories`, getAuthHeaders());
};

export const getCategoryById = (id) => {
  return axios.get(`${API_URL}/api/categories/${id}`, getAuthHeaders());
};

export const updateCategory = (id, categoryData) => {
  return axios.put(
    `${API_URL}/api/categories/${id}`,
    categoryData,
    getAuthHeaders()
  );
};

export const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/api/categories/${id}`, getAuthHeaders());
};

export const signIn = (data) => {
  return axios.post(`${API_URL}/api/auth/login`, data, getAuthHeaders());
};

export const signUp = (data) => {
  return axios.post(`${API_URL}/api/auth/register`, data, getAuthHeaders());
};
