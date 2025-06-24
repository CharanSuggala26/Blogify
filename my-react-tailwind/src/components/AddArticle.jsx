import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddArticle() {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const addNewArticle = async (newArticle) => {
    newArticle.articleId = Date.now();
    newArticle.dateOfCreation = new Date().toISOString();
    newArticle.dateOfModification = new Date().toISOString();
    newArticle.username = currentUser.username;
    newArticle.comments = [];
    newArticle.status = true;

    try {
      const res = await axiosWithToken.post(
        "http://localhost:4000/author-api/new-article",
        newArticle
      );
      if (res.data.message === "New article added") {
        navigate(`/author-profile/articles-by-author/${currentUser.username}`);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr("Error adding article. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Write an Article</h3>
            </div>
            <div className="card-body bg-light">
              {err && (
                <div className="alert alert-danger text-center">{err}</div>
              )}
              <form onSubmit={handleSubmit(addNewArticle)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title", { required: true })}
                    placeholder="Enter article title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    {...register("category", { required: true })}
                  >
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="8"
                    {...register("content", { required: true })}
                    placeholder="Write your article content here..."
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    Post Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;
