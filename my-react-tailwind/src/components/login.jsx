import { useForm } from "react-hook-form";
import { userLoginThunk } from "../Redux/slices/userLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isPending,
    currentUser,
    errorStatus,
    errorMessage,
    loginStatus,
  } = useSelector((state) => state.userLogin);

  function onSignUpFormSubmit(userCred) {
    dispatch(userLoginThunk(userCred));
  }

  useEffect(() => {
    if (loginStatus === true) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      } else if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginStatus]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-5 col-md-6">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h4 className="mb-0">Sign In</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* User Type Radio */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Login as</label>
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
                    autoComplete="current-password"
                    required
                    {...register("password")}
                  />
                </div>

                {/* Error Message */}
                {errorStatus && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPending}
                  >
                    {isPending ? "Logging in..." : "Login"}
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

export default Signin;
