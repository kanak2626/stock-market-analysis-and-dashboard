import React, { useState } from "react";
import { getStockQuote } from "../services/api";

function Search() {

  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchStock = async () => {

    if (symbol.trim() === "") {

      setError("Please enter a stock symbol.");
      return;

    }

    try {

      setLoading(true);
      setError("");

      const data = await getStockQuote(symbol.toUpperCase());

      if (!data || !data.symbol) {

        setError("Stock not found.");
        setStock(null);

      }

      else {

        setStock(data);

      }

    }

    catch (err) {

      console.log(err);

      setError("Unable to fetch stock data.");

      setStock(null);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="container py-4">

      <h2 className="fw-bold mb-4">

        Stock Search

      </h2>

      <div className="card shadow-sm">

        <div className="card-body">

          <div className="row">

            <div className="col-md-9">

              <input

                type="text"

                className="form-control"

                placeholder="Enter Stock Symbol (AAPL, TSLA, MSFT...)"

                value={symbol}

                onChange={(e) => setSymbol(e.target.value)}

                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    searchStock();

                  }

                }}

              />

            </div>

            <div className="col-md-3">

              <button

                className="btn btn-primary w-100"

                onClick={searchStock}

              >

                Search

              </button>

            </div>

          </div>

        </div>

      </div>

      {

        loading &&

        <div className="text-center mt-5">

          <div className="spinner-border text-primary"></div>

          <h5 className="mt-3">

            Fetching Live Data...

          </h5>

        </div>

      }

      {

        error &&

        <div className="alert alert-danger mt-4">

          {error}

        </div>

      }

      {

        stock &&

        <div className="card shadow mt-4">

          <div className="card-header bg-primary text-white">

            <h4>

              {stock.name || stock.symbol}

            </h4>

          </div>

          <div className="card-body">

            <div className="row">

              <div className="col-md-6">

                <p>

                  <strong>Symbol:</strong> {stock.symbol}

                </p>

                <p>

                  <strong>Price:</strong> ${Number(stock.close).toFixed(2)}

                </p>

                <p>

                  <strong>Open:</strong> ${stock.open}

                </p>

                <p>

                  <strong>High:</strong> ${stock.high}

                </p>

                <p>

                  <strong>Low:</strong> ${stock.low}

                </p>

              </div>

              <div className="col-md-6">

                <p>

                  <strong>Previous Close:</strong> ${stock.previous_close}

                </p>

                <p>

                  <strong>Volume:</strong> {stock.volume}

                </p>

                <p>

                  <strong>Change:</strong>

                  <span
                    className={
                      Number(stock.percent_change) >= 0
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >

                    {" "}

                    {Number(stock.percent_change).toFixed(2)}%

                  </span>

                </p>

                <p>

                  <strong>Exchange:</strong> {stock.exchange}

                </p>

              </div>

            </div>

          </div>

        </div>

      }

    </div>

  );

}

export default Search;