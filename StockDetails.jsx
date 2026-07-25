import React, { useState } from "react";
import { getStockQuote, getStockHistory } from "../services/api";
import {
  Line
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockDetails() {

  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStock = async () => {

    if (symbol.trim() === "") {

      setError("Please enter a stock symbol.");

      return;

    }

    try {

      setLoading(true);

      setError("");

      const quote = await getStockQuote(
        symbol.toUpperCase()
      );

      setStock(quote);

      const history = await getStockHistory(
        symbol.toUpperCase()
      );

      const series =
        history["Time Series (Daily)"];

      if (series) {

        const dates = Object.keys(series)
          .slice(0, 7)
          .reverse();

        const prices = dates.map((date) =>
          Number(
            series[date]["4. close"]
          )
        );

        setChartData({

          labels: dates,

          datasets: [

            {

              label: "Closing Price",

              data: prices,

              borderColor: "#2563eb",

              backgroundColor:
                "rgba(37,99,235,0.2)",

              fill: true,

              tension: 0.4

            }

          ]

        });

      }

    }

    catch (err) {

      console.log(err);

      setError("Unable to fetch stock details.");

      setStock(null);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="container py-4">

      <h2 className="fw-bold mb-4">

        Stock Details

      </h2>

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-9">

              <input

                className="form-control"

                placeholder="Enter Stock Symbol (AAPL)"

                value={symbol}

                onChange={(e) =>
                  setSymbol(e.target.value)
                }

                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    fetchStock();

                  }

                }}

              />

            </div>

            <div className="col-md-3">

              <button

                className="btn btn-primary w-100"

                onClick={fetchStock}

              >

                View Details

              </button>

            </div>

          </div>

        </div>

      </div>

      {loading &&

      <div className="text-center">

        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">

          Loading...

        </h5>

      </div>

      }

      {error &&

      <div className="alert alert-danger">

        {error}

      </div>

      }

      {stock && (

        <>

          <div className="card shadow mb-4">

            <div className="card-header bg-primary text-white">

              <h4>

                {stock.name || stock.symbol}

              </h4>

            </div>

            <div className="card-body">

              <div className="row">

                <div className="col-md-6">

                  <p>

                    <strong>Symbol:</strong>

                    {" "}

                    {stock.symbol}

                  </p>

                  <p>

                    <strong>Price:</strong>

                    {" "}

                    ${Number(stock.close).toFixed(2)}

                  </p>

                  <p>

                    <strong>Open:</strong>

                    {" "}

                    ${stock.open}

                  </p>

                  <p>

                    <strong>High:</strong>

                    {" "}

                    ${stock.high}

                  </p>

                  <p>

                    <strong>Low:</strong>

                    {" "}

                    ${stock.low}

                  </p>

                </div>

                <div className="col-md-6">

                  <p>

                    <strong>Previous Close:</strong>

                    {" "}

                    ${stock.previous_close}

                  </p>

                  <p>

                    <strong>Volume:</strong>

                    {" "}

                    {stock.volume}

                  </p>

                  <p>

                    <strong>Exchange:</strong>

                    {" "}

                    {stock.exchange}

                  </p>

                  <p>

                    <strong>Percent Change:</strong>

                    <span

                      className={

                        Number(stock.percent_change) >= 0

                          ? "text-success fw-bold"

                          : "text-danger fw-bold"

                      }

                    >

                      {" "}

                      {Number(
                        stock.percent_change
                      ).toFixed(2)}%

                    </span>

                  </p>

                </div>

              </div>

            </div>

          </div>

          {chartData &&

          <div className="card shadow">

            <div className="card-header bg-primary text-white">

              <h4>

                7-Day Price Trend

              </h4>

            </div>

            <div className="card-body">

              <Line data={chartData} />

            </div>

          </div>

          }

        </>

      )}

    </div>

  );

}

export default StockDetails;