import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleBySlug } from "../../../services/api";

export const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getArticleBySlug(slug);
        setArticle(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch article");
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const formattedDate = new Date(article.datetime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500">{formattedDate} by zikri</p>
      <img
        src={`/${article.thumbnail}`}
        alt={article.title}
        className="w-full h-64 object-cover mb-6 rounded-lg"
      />
      <p
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></p>
    </div>
  );
};
