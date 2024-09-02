import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ArticleForm } from "./components/forms/ArticleForm";
import "./App.css";
import { Article } from "./components/contents/Article";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/article/:name", element: <Article /> },

  { path: "/article/create", element: <ArticleForm /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
