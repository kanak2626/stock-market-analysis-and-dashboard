 import React, { useEffect, useState } from "react";
import { getStockQuote } from "../services/api";

function MarketOverview() {

  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Major global stocks & indices (supported by your API)
  const symbols = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "META",
    "TSLA",
    "NVDA",
    "IBM"
  ];

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {

    try {

      const response = await Promise.all(

        symbols.map(async (symbol) => {

          try {

            const stock = await getStockQuote(symbol);

            return {

              symbol: stock.symbol,

              name: stock.name || stock.symbol,

              price: Number(stock.close),

              open: Number(stock.open),

              high: Number(stock.high),

              low: Number(stock.low),

              previousClose: Number(stock.previous_close),

              change: Number(stock.percent_change),

              volume: stock.volume

            };

          }

          catch {

            return null;

          }

        })

      );

      setMarkets(response.filter(Boolean));

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };



  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Global Market Overview

        </h2>

        <button
          className="btn btn-primary"
          onClick={loadMarketData}
        >

          Refresh

        </button>

      </div>



      {

        loading ?

        <div className="text-center">

          <div className="spinner-border text-primary"></div>

          <h5 className="mt-3">

            Loading Live Market Data...

          </h5>

        </div>

        :

        <div className="row">

          {

            markets.map((market) => (

              <div
                className="col-lg-3 col-md-6 mb-4"
                key={market.symbol}
              >

                <div className="card shadow h-100">

                  <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">

                      {market.name}

                    </h5>

                  </div>

                  <div className="card-body">

                    <p>

                      <strong>Symbol:</strong>

                      {" "}

                      {market.symbol}

                    </p>

                    <h3 className="mb-3">

                      $

                      {market.price.toFixed(2)}

                    </h3>

                    <p>

                      <strong>Open:</strong>

                      {" "}

                      ${market.open}

                    </p>

                    <p>

                      <strong>High:</strong>

                      {" "}

                      ${market.high}

                    </p>

                    <p>

                      <strong>Low:</strong>

                      {" "}

                      ${market.low}

                    </p>

                    <p>

                      <strong>Previous Close:</strong>

                      {" "}

                      ${market.previousClose}

                    </p>

                    <p>

                      <strong>Volume:</strong>

                      {" "}

                      {market.volume}

                    </p>

                    <div className="mt-3">

                      <span

                        className={

                          market.change >= 0

                            ? "badge bg-success fs-6"

                            : "badge bg-danger fs-6"

                        }

                      >

                        {market.change.toFixed(2)}%

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      }



      <div className="card mt-4 shadow-sm">

        <div className="card-body">

          <h4>

            Market Summary

          </h4>

          <p className="mb-1">

            • Live stock prices are fetched using the Twelve Data API.

          </p>

          <p className="mb-1">

            • Green indicates a positive price movement.

          </p>

          <p className="mb-1">

            • Red indicates a negative price movement.

          </p>

          <p className="mb-0">

            • Click Refresh to fetch the latest market prices.

          </p>

        </div>

      </div>

    </div>

  );

}

export default MarketOverview;