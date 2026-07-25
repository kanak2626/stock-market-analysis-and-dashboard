import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-7">

          <div className="card shadow">

            <div className="card-body text-center">

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="profile-image mb-3"
                width="120"
              />

              <h3 className="fw-bold">

                {user.username || "Guest User"}

              </h3>

              <p className="text-muted">

                StockVision User

              </p>

              <hr />

              <div className="text-start">

                <p>

                  <strong>Username :</strong>{" "}

                  {user.username || "Not Available"}

                </p>

                <p>

                  <strong>Status :</strong>{" "}

                  Active

                </p>

                <p>

                  <strong>Dashboard :</strong>{" "}

                  Stock Market Analysis

                </p>

                <p>

                  <strong>Portfolio :</strong>{" "}

                  Stored in Local Storage

                </p>

              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">

                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>

                <button
                  className="btn btn-danger"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;
