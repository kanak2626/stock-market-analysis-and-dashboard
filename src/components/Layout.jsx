import React from "react";


function Layout({ children }) {

  return (

    <div className="app-layout">


      {/* Navbar */}
      <nav className="navbar">

        <h3 className="navbar-brand">
          StockVision Dashboard
        </h3>

      </nav>



      <div className="d-flex">


        {/* Sidebar */}
        <aside className="sidebar">


          <ul>


            <li>
              <a href="/dashboard">
                <i className="bi bi-speedometer2"></i>
                Dashboard
              </a>
            </li>


            <li>
              <a href="/market-overview">
                <i className="bi bi-graph-up"></i>
                Market Overview
              </a>
            </li>


            <li>
              <a href="/search">
                <i className="bi bi-search"></i>
                Search
              </a>
            </li>


            <li>
              <a href="/portfolio">
                <i className="bi bi-briefcase"></i>
                Portfolio
              </a>
            </li>


            <li>
              <a href="/watchlist">
                <i className="bi bi-star"></i>
                Watchlist
              </a>
            </li>


            <li>
              <a href="/news">
                <i className="bi bi-newspaper"></i>
                News
              </a>
            </li>


            <li>
              <a href="/profile">
                <i className="bi bi-person"></i>
                Profile
              </a>
            </li>


          </ul>


        </aside>



        {/* Page Content */}
        <main className="content-area p-4">


          {children}


        </main>


      </div>



      {/* Footer */}
      <footer className="footer">

        © 2026 StockVision Dashboard

      </footer>



    </div>

  );

}


export default Layout;
