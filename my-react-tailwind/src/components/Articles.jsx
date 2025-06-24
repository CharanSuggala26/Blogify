import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { FcReading } from "react-icons/fc";

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const getArticles = async () => {
    try {
      const res = await axiosWithToken.get(
        "http://localhost:4000/user-api/articles"
      );

      if (res.data.message === "All articles") {
        setArticlesList(res.data.payload);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr("Failed to load articles. Please try again later.");
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  return (
    <div className="container mt-5">
      {err && (
        <div className="alert alert-danger text-center fs-5">{err}</div>
      )}
      {articlesList.length === 0 ? (
        <p className="display-4 text-center text-danger">No Articles Found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{article.title}</h5>
                  <p className="card-text text-muted">
                    {article.content.substring(0, 100) + "...."}
                  </p>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => readArticleByArticleId(article)}
                  >
                    <FcReading className="fs-4 me-2" />
                    Read More
                  </button>
                </div>
                <div className="card-footer bg-transparent text-end">
                  <small className="text-secondary">
                    Last updated: {article.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Articles;
