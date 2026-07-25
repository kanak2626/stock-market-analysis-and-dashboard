import React, { useEffect, useState } from "react";
import { getStockQuote } from "../services/api";

function Watchlist() {

  const [symbol, setSymbol] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("watchlist"));

    if (saved) {

      setWatchlist(saved);

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(

      "watchlist",

      JSON.stringify(watchlist)

    );

  }, [watchlist]);



  const addStock = async () => {

    if (symbol.trim() === "") {

      alert("Enter a Stock Symbol");

      return;

    }

    try {

      setLoading(true);

      const stock = await getStockQuote(

        symbol.toUpperCase()

      );

      if (!stock.symbol) {

        alert("Invalid Symbol");

        return;

      }

      const exists = watchlist.find(

        item => item.symbol === stock.symbol

      );

      if (exists) {

        alert("Already Added");

        return;

      }

      setWatchlist([

        ...watchlist,

        stock

      ]);

      setSymbol("");

    }

    catch (error) {

      console.log(error);

      alert("Unable to Fetch Stock");

    }

    finally {

      setLoading(false);

    }

  };



  const removeStock = (symbol) => {

    setWatchlist(

      watchlist.filter(

        stock => stock.symbol !== symbol

      )

    );

  };



  const refreshWatchlist = async () => {

    try {

      setLoading(true);

      const updated = await Promise.all(

        watchlist.map(async(stock)=>{

          return await getStockQuote(stock.symbol);

        })

      );

      setWatchlist(updated);

    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }

  };



  return (

    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          My Watchlist

        </h2>

        <button

          className="btn btn-primary"

          onClick={refreshWatchlist}

        >

          Refresh

        </button>

      </div>



      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-9">

              <input

                type="text"

                className="form-control"

                placeholder="Enter Stock Symbol"

                value={symbol}

                onChange={(e)=>setSymbol(e.target.value)}

                onKeyDown={(e)=>{

                  if(e.key==="Enter"){

                    addStock();

                  }

                }}

              />

            </div>

            <div className="col-md-3">

              <button

                className="btn btn-success w-100"

                onClick={addStock}

              >

                Add Stock

              </button>

            </div>

          </div>

        </div>

      </div>



      {

        loading &&

        <div className="text-center">

          <div className="spinner-border text-primary"></div>

          <h5 className="mt-3">

            Loading...

          </h5>

        </div>

      }



      <div className="row">

        {

          watchlist.length===0 ?

          (

            <div className="text-center">

              <h4>

                No Stocks Added

              </h4>

            </div>

          )

          :

          watchlist.map((stock)=>(

            <div

              className="col-lg-4 col-md-6 mb-4"

              key={stock.symbol}

            >

              <div className="card shadow h-100">

                <div className="card-header bg-primary text-white">

                  <h5>

                    {stock.symbol}

                  </h5>

                </div>

                <div className="card-body">

                  <p>

                    <strong>Price:</strong>

                    ${Number(stock.close).toFixed(2)}

                  </p>

                  <p>

                    <strong>Open:</strong>

                    ${stock.open}

                  </p>

                  <p>

                    <strong>High:</strong>

                    ${stock.high}

                  </p>

                  <p>

                    <strong>Low:</strong>

                    ${stock.low}

                  </p>

                  <p>

                    <strong>Volume:</strong>

                    {stock.volume}

                  </p>

                  <p>

                    <strong>Change:</strong>

                    <span

                      className={

                        Number(stock.percent_change)>=0

                        ?

                        "text-success fw-bold"

                        :

                        "text-danger fw-bold"

                      }

                    >

                      {" "}

                      {Number(stock.percent_change).toFixed(2)}%

                    </span>

                  </p>

                  <button

                    className="btn btn-danger w-100 mt-3"

                    onClick={()=>removeStock(stock.symbol)}

                  >

                    Remove

                  </button>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Watchlist;
