import React, { useEffect, useState } from "react";
import { getMarketNews } from "../services/api";

function News() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    loadNews();

  }, []);

  const loadNews = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await getMarketNews();

      setNews(response.slice(0, 12));

    }

    catch (err) {

      console.log(err);

      setError("Unable to fetch latest market news.");

    }

    finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (

      <div className="container mt-5 text-center">

        <div className="spinner-border text-primary"></div>

        <h4 className="mt-3">

          Loading Latest News...

        </h4>

      </div>

    );

  }



  if (error) {

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">

          {error}

        </div>

      </div>

    );

  }



  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Latest Market News

        </h2>

        <button
          className="btn btn-primary"
          onClick={loadNews}
        >

          Refresh

        </button>

      </div>



      <div className="row">

        {

          news.map((article) => (

            <div
              key={article.id}
              className="col-lg-4 col-md-6 mb-4"
            >

              <div className="card shadow h-100">

                <img

                  src={article.image}

                  className="card-img-top"

                  alt={article.headline}

                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}

                />

                <div className="card-body d-flex flex-column">

                  <h5>

                    {article.headline}

                  </h5>

                  <p className="text-muted">

                    {article.source}

                  </p>

                  <p>

                    {

                      article.summary.length > 180

                        ? article.summary.substring(0, 180) + "..."

                        : article.summary

                    }

                  </p>

                  <div className="mt-auto">

                    <a

                      href={article.url}

                      target="_blank"

                      rel="noreferrer"

                      className="btn btn-primary"

                    >

                      Read More

                    </a>

                  </div>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default News;