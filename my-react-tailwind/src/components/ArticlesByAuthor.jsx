import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { FcReading } from "react-icons/fc";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userLogin);
  const token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const getArticlesOfCurrentAuthor = async () => {
    try {
      const res = await axiosWithToken.get(
        `http://localhost:4000/author-api/articles/${currentUser.username}`
      );
      if (res.data.message === "Articles") {
        setArticlesList(res.data.payload);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setErr("Something went wrong");
    }
  };

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  return (
    <div className="container mt-5">
      {articlesList.length === 0 ? (
        <p className="display-5 text-center text-danger">{err || "No Articles Found"}</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{article.title}</h5>
                  <p className="card-text">
                    {article.content.substring(0, 80)}...
                  </p>
                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    onClick={() => readArticleByArticleId(article)}
                  >
                    <FcReading className="me-2 fs-5" />
                    Read More
                  </button>
                </div>
                <div className="card-footer bg-transparent">
                  <small className="text-muted">
                    Last updated on {article.dateOfModification}
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

export default ArticlesByAuthor;
