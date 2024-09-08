import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

import { Navbar } from "./components/commons/Navbar";
import { ArticleForm } from "./components/Forms/ArticleForm";
import { CategoryForm } from "./components/Forms/CategoryForm";
import { Article } from "./components/contents/contentArticles/Article";
import { Categories } from "./components/contents/contentCategories/Categories";
import { Category } from "./components/contents/contentCategories/Category";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/articles/:slug", element: <Article /> },
  { path: "/article/create", element: <ArticleForm /> },
  { path: "/categories/", element: <Categories /> },
  { path: "/category/:id", element: <Category /> },
  { path: "/category/create", element: <CategoryForm /> },
  { path: "/category/edit/:id", element: <CategoryForm /> },
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
