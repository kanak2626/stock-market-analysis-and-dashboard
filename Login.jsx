import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = () => {
    if (password.length === 0) return "";

    if (password.length < 5) return "Weak Password";

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "Strong Password";
    }

    return "Medium Password";
  };

  const handleLogin = (e) => {

    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

   localStorage.setItem(
  "stockvisionUser",
  JSON.stringify({
    username
  })
);
    navigate("/dashboard");
  };

  return (

    <div className="login-page">

      <div className="card shadow login-card">

        <div className="card-body p-5">

          <h2 className="text-center fw-bold mb-2">
            StockVision
          </h2>

          <p className="text-center text-muted mb-4">
            Login to access your smart dashboard
          </p>

          <form onSubmit={handleLogin}>

            <div className="mb-3">

              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Password
              </label>

              <div className="input-group">

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>

              </div>

            </div>

            {password && (

              <p
                className={
                  getStrength() === "Strong Password"
                    ? "text-success fw-bold"
                    : getStrength() === "Medium Password"
                    ? "text-warning fw-bold"
                    : "text-danger fw-bold"
                }
              >
                {getStrength()}
              </p>

            )}

            <button
              className="btn btn-primary w-100 mt-3"
              type="submit"
            >
              Login
            </button>

          </form>

          <button
            className="btn btn-link w-100 mt-3"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>

  );

}

export default Login;