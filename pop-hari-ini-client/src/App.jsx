import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./utils/auth";

import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AuthPage } from "./pages/AuthPage";

import { Navbar } from "./components/commons/Navbar";
import { ArticleForm } from "./components/Forms/ArticleForm";
import { CategoryForm } from "./components/Forms/CategoryForm";
import { Article } from "./components/contents/contentArticles/Article";
import { Categories } from "./components/contents/contentCategories/Categories";
import { Category } from "./components/contents/contentCategories/Category";
import { ArticleTable } from "./components/contents/contentArticles/ArticleTable";

const router = createBrowserRouter([
  { path: "/register", element: <AuthPage /> },
  { path: "/login", element: <AuthPage /> },
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/articles/:slug", element: <Article /> },
  {
    path: "/articles",
    element: (
      <ProtectedRoute element={<ArticleTable />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "/article/create",
    element: (
      <ProtectedRoute element={<ArticleForm />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "/article/edit/:id",
    element: (
      <ProtectedRoute element={<ArticleForm />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "/categories/",
    element: (
      <ProtectedRoute element={<Categories />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "/category/:id",
    element: <ProtectedRoute element={<Category />} allowedRoles={["ADMIN"]} />,
  },
  {
    path: "/category/create",
    element: (
      <ProtectedRoute element={<CategoryForm />} allowedRoles={["ADMIN"]} />
    ),
  },
  {
    path: "/category/edit/:id",
    element: (
      <ProtectedRoute element={<CategoryForm />} allowedRoles={["ADMIN"]} />
    ),
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
