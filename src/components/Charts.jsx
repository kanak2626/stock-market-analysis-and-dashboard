 import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { getMarketChartData } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

function Charts() {

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {

    try {

      const data = await getMarketChartData();

      setStocks(data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="text-center mt-5">

        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">

          Loading Charts...

        </h5>

      </div>

    );

  }

  if (stocks.length === 0) {

    return (

      <div className="alert alert-danger">

        Unable to load chart data.

      </div>

    );

  }

  const lineData = {

    labels: stocks.map((item) => item.symbol),

    datasets: [

      {

        label: "Opening Price",

        data: stocks.map((item) => item.open),

        borderColor: "#2563eb",

        backgroundColor: "rgba(37,99,235,0.2)",

        fill: true,

        tension: 0.4,

        pointRadius: 5,

      },

      {

        label: "Closing Price",

        data: stocks.map((item) => item.close),

        borderColor: "#16a34a",

        backgroundColor: "rgba(22,163,74,0.2)",

        fill: true,

        tension: 0.4,

        pointRadius: 5,

      }

    ]

  };

  const pieData = {

    labels: stocks.map((item) => item.symbol),

    datasets: [

      {

        data: stocks.map((item) => item.close),

        backgroundColor: [

          "#2563eb",

          "#16a34a",

          "#f59e0b",

          "#ef4444",

          "#8b5cf6",

          "#06b6d4",

          "#ec4899"

        ],

        borderWidth: 1

      }

    ]

  };

  const lineOptions = {

    responsive: true,

    plugins: {

      legend: {

        position: "top"

      },

      datalabels: {

        color: "#000",

        anchor: "end",

        align: "top",

        font: {

          weight: "bold",

          size: 11

        },

        formatter: (value) => "$" + value.toFixed(2)

      }

    },

    scales: {

      y: {

        beginAtZero: false,

        title: {

          display: true,

          text: "Price ($)"

        }

      },

      x: {

        title: {

          display: true,

          text: "Stocks"

        }

      }

    }

  };

  const pieOptions = {

    responsive: true,

    plugins: {

      legend: {

        position: "bottom"

      },

      datalabels: {

        color: "#fff",

        font: {

          weight: "bold",

          size: 13

        },

        formatter: (value, context) =>

          context.chart.data.labels[context.dataIndex]

      }

    }

  };

  return (

    <div className="row">

      <div className="col-lg-8 mb-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">

              Market Opening vs Closing Prices

            </h5>

          </div>

          <div className="card-body">

            <Line

              data={lineData}

              options={lineOptions}

            />

          </div>

        </div>

      </div>

      <div className="col-lg-4 mb-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">

              Stock Price Distribution

            </h5>

          </div>

          <div className="card-body">

            <Pie

              data={pieData}

              options={pieOptions}

            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default Charts;
 
 
