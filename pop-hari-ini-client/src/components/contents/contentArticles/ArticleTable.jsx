import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteArticle, getArticles } from "../../../services/api";
import { ConfirmModal } from "../../commons/ConfirmModal";
import DataTable from "react-data-table-component";

export const ArticleTable = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getArticles();
        setArticles(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setIsConfirmModalOpen(true);
  };

  const handleModal = async () => {
    try {
      await deleteArticle(selectedArticle.id);
      setArticles(
        articles.filter((article) => article.id !== selectedArticle.id)
      );

      setIsConfirmModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete article", err);
      console.error("Failed to delete article", err);
    }
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/article/edit/${row.id}`)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filteredArticles = articles.filter((artilce) =>
    artilce.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
        <Link
          to="/category/create"
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
        >
          Add Category
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={filteredArticles}
        pagination
        highlightOnHover
        responsive
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search Articles"
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        }
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleModal}
      />
    </div>
  );
};
