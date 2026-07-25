import React from "react";

import SearchBar from "../components/SearchBar";
import DataCard from "../components/DataCard";
import Charts from "../components/Charts";
import PortfolioTable from "../components/PortfolioTable";
import InfoCard from "../components/InfoCard";
import StatusMessage from "../components/StatusMessage";


function Dashboard() {


  const userData = JSON.parse(
    localStorage.getItem("stockvisionUser")
  );


  const user = userData?.username || "User";



  return (

    <div className="container-fluid">



      {/* Heading */}

      <div className="mb-4">


        <h2 className="fw-bold">

          Welcome, {user}

        </h2>


        <p className="text-muted">

          Monitor live stock prices, portfolio performance and market insights.

        </p>


      </div>




      {/* Search */}

      <SearchBar />





      {/* Live Market Cards */}


      <div className="row g-3 mt-3">


        <div className="col-lg-3 col-md-6">

          <DataCard

            title="Apple"

            symbol="AAPL"

          />

        </div>




        <div className="col-lg-3 col-md-6">

          <DataCard

            title="Microsoft"

            symbol="MSFT"

          />

        </div>




        <div className="col-lg-3 col-md-6">

          <DataCard

            title="Meta"

            symbol="META"

          />

        </div>




        <div className="col-lg-3 col-md-6">

          <DataCard

            title="IBM"

            symbol="IBM"

          />

        </div>


      </div>






      {/* Charts */}


      <div className="mt-5">


        <Charts symbol="IBM" />


      </div>






      {/* Portfolio */}


      <div className="mt-5">


        <PortfolioTable />


      </div>







      {/* Live Market Insights */}


      <div className="mt-5">


        <InfoCard symbol="AAPL" />


      </div>







      {/* Status */}


      <div className="mt-4">


        <StatusMessage

          type="success"

          message="Dashboard loaded successfully."

        />


      </div>




    </div>

  );

}


export default Dashboard;
