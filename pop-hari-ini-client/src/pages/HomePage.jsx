import React, { useEffect, useState } from "react";
import Articles from "../components/contents/Articles";
import { getArticles } from "../services/api";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const loadArticles = async () => {
      const articleData = await getArticles();
      setArticles(articleData.data);
    };
    loadArticles();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pop Hari Ini
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            The Now Sounds of Indonesia.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Articles articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
