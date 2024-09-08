import { useState, useEffect } from "react";

export const Category = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategories();
        setCategory(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Category");
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{category.name}</h1>
    </div>
  );
};
