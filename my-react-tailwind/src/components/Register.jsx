import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    let res;
    try {
      if (userObj.userType === "user") {
        res = await axios.post("http://localhost:4000/user-api/user", userObj);
      } else if (userObj.userType === "author") {
        res = await axios.post("http://localhost:4000/author-api/user", userObj);
      }

      const msg = res?.data?.message;

      if (msg === "User created" || msg === "Author created") {
        navigate("/signin");
      } else {
        setErr(msg);
      }
    } catch (error) {
      setErr("Registration failed. Please try again.");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-5 col-md-6">
          <div className="card shadow">
            <div className="card-header text-center bg-success text-white">
              <h4 className="mb-0">Sign Up</h4>
            </div>
            <div className="card-body">
              {err && (
                <div className="alert alert-danger text-center">{err}</div>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* User Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Register as</label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType")}
                    />
                    <label className="form-check-label" htmlFor="author">
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label className="form-check-label" htmlFor="user">
                      User
                    </label>
                  </div>
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    autoComplete="username"
                    required
                    {...register("username")}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    autoComplete="new-password"
                    required
                    {...register("password")}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    autoComplete="email"
                    required
                    {...register("email")}
                  />
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Register
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

export default Signup;
