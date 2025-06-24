import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthorProfile() {
  const { currentUser } = useSelector((state) => state.userLogin);

  return (
    <div className="container mt-4">
      <ul className="nav nav-pills justify-content-center mb-4 fs-5">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              "nav-link me-3 " + (isActive ? "active" : "text-success")
            }
            to={`articles-by-author/${currentUser.username}`}
          >
            Articles by {currentUser.username}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "text-success")
            }
            to="new-article"
          >
            Add New Article
          </NavLink>
        </li>
      </ul>

      <div className="border p-3 bg-light rounded shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;
