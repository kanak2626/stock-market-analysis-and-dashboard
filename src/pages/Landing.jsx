import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-graph-up-arrow me-2"></i>
            StockVision
          </a>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="container text-center py-5">

        <h1 className="display-3 fw-bold mt-5">
          Smart Stock Market Analysis
        </h1>

        <p className="lead text-muted mt-3">
          Track markets, analyze portfolios, understand risks,
          and get intelligent stock insights in one dashboard.
        </p>


        <button
          className="btn btn-primary btn-lg mt-4 px-5"
          onClick={() => navigate("/login")}
        >
          Get Started
          <i className="bi bi-arrow-right ms-2"></i>
        </button>

      </section>


      {/* Features */}
      <section className="container py-5">

        <h2 className="text-center mb-4">
          Features
        </h2>


        <div className="row g-4">

          <div className="col-md-3">
            <div className="card h-100 shadow-sm text-center p-3">

              <i className="bi bi-bar-chart-line display-5 text-primary"></i>

              <h5 className="mt-3">
                Market Analysis
              </h5>

              <p>
                Monitor NIFTY, SENSEX and global markets.
              </p>

            </div>
          </div>



          <div className="col-md-3">

            <div className="card h-100 shadow-sm text-center p-3">

              <i className="bi bi-wallet2 display-5 text-success"></i>

              <h5 className="mt-3">
                Portfolio Tracking
              </h5>

              <p>
                Manage investments and calculate profit/loss.
              </p>

            </div>

          </div>



          <div className="col-md-3">

            <div className="card h-100 shadow-sm text-center p-3">

              <i className="bi bi-lightbulb display-5 text-warning"></i>

              <h5 className="mt-3">
                AI Insights
              </h5>

              <p>
                Get recommendations and market analysis.
              </p>

            </div>

          </div>



          <div className="col-md-3">

            <div className="card h-100 shadow-sm text-center p-3">

              <i className="bi bi-shield-check display-5 text-danger"></i>

              <h5 className="mt-3">
                Risk Analysis
              </h5>

              <p>
                Understand investment risks easily.
              </p>

            </div>

          </div>


        </div>

      </section>


      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">

        <p className="mb-0">
           2026 StockVision Dashboard | Smart Market Intelligence
        </p>

      </footer>


    </div>
  );
}

export default Landing;
