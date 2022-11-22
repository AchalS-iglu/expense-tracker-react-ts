import React from "react";

import { UserAuth } from "../Firebase/AuthContext";

const SignIn = () => {
  const { googleSignIn, loading } = UserAuth();
  return (
    <section
      className="vh-100 gradient-custom"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card text-white"
              style={{ borderRadius: "1rem", backgroundColor: "#A7CCED" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 text-dark">
                  <img
                    className="mb-3"
                    src="https://avatars.githubusercontent.com/u/45008879?v=4"
                    style={{ width: 185, borderRadius: "50%" }}
                    alt="logo"
                  />
                  <br />
                  <span className="text-light">Welcome to</span>
                  <h1 className="mb-3">iglu boi's expense tracker</h1>
                  <h2 className="fw-bold mb-5 text-uppercase">Login</h2>
                  {loading ? (
                    <div>
                      <div className="d-flex justify-content-center">
                        <div
                          className="spinner-border text-info"
                          role="status"
                          style={{ width: "3rem", height: "4rem" }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-3" onClick={googleSignIn}>
                        <span className="btn btn-lg btn-google btn-block text-uppercase btn-outline border-dark rounded text-dark">
                          <img
                            src="https://img.icons8.com/color/16/000000/google-logo.png"
                            alt="Login with Google"
                          />{" "}
                          Signin Using Google
                        </span>
                      </div>
                      <div className="" onClick={googleSignIn}>
                        <span className="btn btn-lg btn-google btn-block text-uppercase btn-outline border-dark rounded text-dark">
                          <img
                            src="https://img.icons8.com/color/16/000000/google-logo.png"
                            alt="Login with Google"
                          />{" "}
                          Signin Using Google
                        </span>
                      </div>
                    </div>
                  )}
                  {/* <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p> */}

                  {/* <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                  </div> */}

                  {/* <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                  </div> */}

                  {/* <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p> */}

                  {/* <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button> */}
                  {/* 
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div> */}
                </div>

                <div>
                  <p className="mb-0">
                    Built by{" "}
                    <a
                      href="https://achals-iglu.github.io/"
                      className="text-dark-50 fw-bold"
                    >
                      Achal Singhal
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
