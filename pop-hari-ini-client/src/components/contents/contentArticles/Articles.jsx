import React from "react";
import { Link } from "react-router-dom";

const Articles = ({ articles }) => {
  // Validasi untuk memastikan `articles` adalah objek dan memiliki properti `data` yang berupa array
  if (!articles || !Array.isArray(articles.data)) {
    return <p className="text-red-500">No articles data available</p>;
  }

  return (
    <>
      {articles.data.length === 0 ? (
        <p>No articles available</p>
      ) : (
        articles.data.map((article) => {
          const date = new Date(article.datetime);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <article key={article.id} className="article-item flex flex-col">
              <div className="article-image-container h-64 w-full overflow-hidden rounded-lg">
                <Link to={`/articles/${article.slug}`}>
                  <img
                    src={`/${article.thumbnail}`}
                    alt={article.title}
                    className="article-image h-full w-full object-cover"
                  />
                </Link>
              </div>

              <div className="article-meta mt-4 text-xs text-gray-500 flex items-center gap-x-4">
                <time dateTime={article.datetime} className="article-date">
                  {formattedDate}
                </time>
                <a
                  href="#"
                  className="article-category bg-gray-50 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-100"
                >
                  Sehidup Semusik
                </a>
              </div>

              <h3 className="article-title mt-3 text-lg font-semibold text-gray-900">
                <a href="#">{article.title}</a>
              </h3>

              {/* <div
                className="article-content mt-2 text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: article.content }}
              /> */}

              <div className="article-author mt-4 flex items-center gap-x-4">
                {/* <img
                  src={`/users/zikri.jpg`}
                  alt={article.title}
                  className="author-image h-10 w-10 rounded-full bg-gray-50"
                /> */}
                <div className="author-info text-sm">
                  <p className="author-name font-semibold text-gray-900">
                    Zikri Azzuri
                  </p>
                  <p className="author-position text-gray-600">Author</p>
                </div>
              </div>
            </article>
          );
        })
      )}
    </>
  );
};

export default Articles;
