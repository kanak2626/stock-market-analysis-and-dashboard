import React, { useState, useEffect } from "react";
import {
  calculateInvestment,
  calculateCurrentValue,
  calculateProfitLoss,
  calculatePercentage
} from "../insights/calculations";

function Portfolio() {

  const [portfolio, setPortfolio] = useState([]);
  const [form, setForm] = useState({
    symbol: "",
    buyPrice: "",
    currentPrice: "",
    quantity: ""
  });

  useEffect(() => {

    const saved = localStorage.getItem("portfolio");

    if (saved) {

      setPortfolio(JSON.parse(saved));

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "portfolio",
      JSON.stringify(portfolio)
    );

  }, [portfolio]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addStock = (e) => {

    e.preventDefault();

    if (
      !form.symbol ||
      !form.buyPrice ||
      !form.currentPrice ||
      !form.quantity
    ) {
      alert("Please fill all fields");
      return;
    }

    const stock = {

      id: Date.now(),

      symbol: form.symbol.toUpperCase(),

      buyPrice: Number(form.buyPrice),

      currentPrice: Number(form.currentPrice),

      quantity: Number(form.quantity)

    };

    setPortfolio([...portfolio, stock]);

    setForm({

      symbol: "",

      buyPrice: "",

      currentPrice: "",

      quantity: ""

    });

  };

  const deleteStock = (id) => {

    setPortfolio(

      portfolio.filter((stock) => stock.id !== id)

    );

  };

  return (

    <div className="container py-4">

      <h2 className="fw-bold mb-4">

        Portfolio Management

      </h2>

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <form
            className="row g-3"
            onSubmit={addStock}
          >

            <div className="col-md-3">

              <input
                type="text"
                className="form-control"
                placeholder="Stock Symbol"
                name="symbol"
                value={form.symbol}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-2">

              <input
                type="number"
                className="form-control"
                placeholder="Buy Price"
                name="buyPrice"
                value={form.buyPrice}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-2">

              <input
                type="number"
                className="form-control"
                placeholder="Current Price"
                name="currentPrice"
                value={form.currentPrice}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-2">

              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-3">

              <button
                className="btn btn-primary w-100"
                type="submit"
              >

                Add Stock

              </button>

            </div>

          </form>

        </div>

      </div>

      <div className="card shadow-sm">

        <div className="card-body table-responsive">

          <table className="table table-hover">

            <thead className="table-primary">

              <tr>

                <th>Symbol</th>

                <th>Buy Price</th>

                <th>Current Price</th>

                <th>Quantity</th>

                <th>Investment</th>

                <th>Current Value</th>

                <th>P/L</th>

                <th>Return %</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                portfolio.length === 0 ?

                (

                  <tr>

                    <td
                      colSpan="9"
                      className="text-center"
                    >

                      No Stocks Added

                    </td>

                  </tr>

                )

                :

                portfolio.map((stock) => {

                  const investment = calculateInvestment(

                    stock.buyPrice,

                    stock.quantity

                  );

                  const current = calculateCurrentValue(

                    stock.currentPrice,

                    stock.quantity

                  );

                  const profit = calculateProfitLoss(

                    stock.buyPrice,

                    stock.currentPrice,

                    stock.quantity

                  );

                  const percent = calculatePercentage(

                    stock.buyPrice,

                    stock.currentPrice

                  );

                  return (

                    <tr key={stock.id}>

                      <td>{stock.symbol}</td>

                      <td>${stock.buyPrice}</td>

                      <td>${stock.currentPrice}</td>

                      <td>{stock.quantity}</td>

                      <td>${investment.toFixed(2)}</td>

                      <td>${current.toFixed(2)}</td>

                      <td
                        className={
                          profit >= 0
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >

                        ${profit.toFixed(2)}

                      </td>

                      <td
                        className={
                          percent >= 0
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >

                        {percent.toFixed(2)}%

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteStock(stock.id)}
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  );

                })

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Portfolio;
