import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go back to Home
      </Link>
    </div>
  );
};
