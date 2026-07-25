 import React, { useEffect, useState } from "react";
import { getLiveQuote } from "../services/api";

function InfoCard({ symbol = "AAPL" }) {

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInfo();
  }, [symbol]);

  const loadInfo = async () => {
    try {
      const data = await getLiveQuote(symbol);

      const recommendation =
        data.dp >= 2
          ? "BUY"
          : data.dp <= -2
          ? "SELL"
          : "HOLD";

      const mood =
        data.d >= 0
          ? "Bullish"
          : "Bearish";

      let risk = "";

      if (Math.abs(data.dp) < 2) {
        risk = "Low";
      } else if (Math.abs(data.dp) < 5) {
        risk = "Medium";
      } else {
        risk = "High";
      }

      setInfo({
        price: data.c,
        change: data.d,
        percent: data.dp,
        recommendation,
        mood,
        risk
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card shadow-sm p-4">
        Loading Market Insights...
      </div>
    );
  }

  return (

    <div className="card shadow-sm p-4">

      <h4 className="mb-4">
        Live Market Insights
      </h4>

      <div className="row text-center">

        <div className="col-md-4 mb-3">

          <h6>Current Price</h6>

          <h4>
            ${Number(info.price).toFixed(2)}
          </h4>

        </div>

        <div className="col-md-4 mb-3">

          <h6>Today's Change</h6>

          <h4
            className={
              info.change >= 0
                ? "text-success"
                : "text-danger"
            }
          >
            {Number(info.percent).toFixed(2)}%
          </h4>

        </div>

        <div className="col-md-4 mb-3">

          <h6>Recommendation</h6>

          <span
            className={
              info.recommendation === "BUY"
                ? "badge bg-success"
                : info.recommendation === "SELL"
                ? "badge bg-danger"
                : "badge bg-warning text-dark"
            }
          >
            {info.recommendation}
          </span>

        </div>

      </div>

      <hr />

      <div className="row text-center">

        <div className="col-md-6">

          <h6>Market Mood</h6>

          <p>{info.mood}</p>

        </div>

        <div className="col-md-6">

          <h6>Risk Level</h6>

          <p>{info.risk}</p>

        </div>

      </div>

    </div>

  );

}

export default InfoCard;