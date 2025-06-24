import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-start mb-3">
        <NavLink to="articles" className="nav-link fs-4 text-primary">
          View Articles
        </NavLink>
      </div>
      <div className="border p-3 rounded shadow-sm bg-light">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
