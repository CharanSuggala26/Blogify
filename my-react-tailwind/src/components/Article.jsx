import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FcClock,
  FcCalendar,
  FcComments,
  FcPortraitMode,
} from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdRestore } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Article() {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);
  const { state } = useLocation();
  const [commentStatus, setCommentStatus] = useState("");
  const [articleEditStatus, setArticleEditStatus] = useState(false);
  const [editedArticle, setEditedArticle] = useState(state);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const postComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    const res = await axiosWithToken.post(
      `http://localhost:4000/user-api/comment/${state.articleId}`,
      commentObj
    );
    if (res.data.message === "User comment added") {
      setCommentStatus("Comment added successfully!");
    } else {
      setErr(res.data.message);
    }
  };

  const editArticle = () => setArticleEditStatus(true);

  const saveArticle = async (formData) => {
    const modifiedArticle = { ...state, ...formData };
    delete modifiedArticle._id;
    modifiedArticle.dateOfModification = new Date().toISOString();

    const res = await axiosWithToken.put(
      "http://localhost:4000/author-api/article",
      modifiedArticle
    );

    if (res.data.message === "Article modified") {
      setArticleEditStatus(false);
      setEditedArticle(res.data.payload);
      navigate(`/author-profile/article/${state.articleId}`, {
        state: res.data.payload,
      });
    }
  };

  return (
    <div className="container my-4">
      {articleEditStatus ? (
        <form onSubmit={handleSubmit(saveArticle)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title")}
              defaultValue={state.title}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Select a category
            </label>
            <select
              {...register("category")}
              id="category"
              className="form-select"
              defaultValue={state.category}
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
              {...register("content")}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Save Article
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="text-dark">{editedArticle.title}</h2>
              <div className="text-muted small">
                <FcCalendar className="me-1" />
                Created on: {editedArticle.dateOfCreation}
                <span className="ms-3">
                  <FcClock className="me-1" />
                  Modified on: {editedArticle.dateOfModification}
                </span>
              </div>
            </div>
            {currentUser.userType === "author" && (
              <div>
                <button className="btn btn-warning me-2" onClick={editArticle}>
                  <CiEdit className="fs-5" /> Edit
                </button>
                <button className="btn btn-danger">
                  <MdDelete className="fs-5" /> Delete
                </button>
              </div>
            )}
          </div>

          <hr />
          <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
            {editedArticle.content}
          </p>

          {/* Comments Section */}
          <div className="mt-5">
            <h4 className="mb-3">Comments</h4>
            {state.comments.length === 0 ? (
              <p className="text-muted fs-5">No comments yet...</p>
            ) : (
              state.comments.map((commentObj, idx) => (
                <div className="bg-light rounded p-3 mb-2" key={idx}>
                  <p className="mb-1 text-primary fw-semibold text-capitalize">
                    <FcPortraitMode className="me-1" />
                    {commentObj.username}
                  </p>
                  <p className="ps-3 text-dark">
                    <FcComments className="me-2" />
                    {commentObj.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Comment Form */}
          {currentUser.userType === "user" && (
            <form className="mt-4" onSubmit={handleSubmit(postComment)}>
              <input
                type="text"
                {...register("comment")}
                className="form-control mb-3"
                placeholder="Write a comment..."
              />
              <button type="submit" className="btn btn-success">
                Add a Comment <BiCommentAdd className="ms-2 fs-5" />
              </button>
              {commentStatus && (
                <p className="text-success mt-2">{commentStatus}</p>
              )}
              {err && <p className="text-danger mt-2">{err}</p>}
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Article;
