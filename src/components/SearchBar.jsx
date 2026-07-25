 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {

    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const handleSearch = (e) => {

        e.preventDefault();

        if (query.trim() === "") {

            alert("Enter stock name or symbol");

            return;

        }

        navigate(`/stock/${query.toUpperCase()}`);

    };

    return (

        <form className="d-flex mb-4" onSubmit={handleSearch}>

            <input
                type="text"
                className="form-control me-2"
                placeholder="Search stock (AAPL, TSLA, IBM)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                className="btn btn-primary"
                type="submit"
            >
                <i className="bi bi-search me-1"></i>
                Search
            </button>

        </form>

    );

}

export default SearchBar;
