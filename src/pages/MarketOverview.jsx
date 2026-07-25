import React, { useEffect, useState, useCallback } from "react";
import { getMarketData } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";
import MarketCard from "../components/MarketCard";


function MarketOverview() {

  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const loadMarketData = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getMarketData();

      setMarketData(data);

    } catch (err) {

      console.log(err);
      setError("Unable to load market data");

    } finally {

      setLoading(false);

    }

  }, []);



  useEffect(() => {

    loadMarketData();

  }, [loadMarketData]);



  return (

    <div className="container-fluid mt-4">

      <h2 className="mb-4">
        Market Overview
      </h2>


      {loading && (

        <div className="text-center mt-4">

          <div 
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>

          </div>

          <p className="mt-2">
            Loading market data...
          </p>

        </div>

      )}



      {error && (

        <ErrorMessage 
          message={error}
        />

      )}



      {!loading && !error && (

        <div className="row">

          {marketData.length > 0 ? (

            marketData.map((stock, index) => (

              <div 
                className="col-md-4 mb-4"
                key={index}
              >

                <MarketCard 
                  stock={stock}
                />

              </div>

            ))

          ) : (

            <div className="alert alert-warning">

              No market data available.

            </div>

          )}

        </div>

      )}

    </div>

  );

}


export default MarketOverview;
