import React from "react";
import "./SignIn.css";

import { UserAuth } from "../Firebase/AuthContext";

const SignIn = () => {
  const { googleSignIn } = UserAuth();
  return (
    <section
      className="vh-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card rounded-3 text-black">
              <div className="container-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <img
                      src="https://avatars.githubusercontent.com/u/45008879?v=4"
                      style={{ width: 185, borderRadius: "50%" }}
                      alt="logo"
                    />
                    <br />
                    <span className="mt-1 mb-5 pb-1">Welcome to</span>
                    <h1 className="mt-1 mb-5 pb-1">
                      iglu boi's expense tracker
                    </h1>
                    <div className="col-md-12 border rounded" onClick={googleSignIn}>
                      <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
                        Signin Using Google
                      </a>
                    </div>
                  </div>
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
