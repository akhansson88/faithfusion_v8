import React from 'react';

    function SearchFilters() {
      return (
        <div className="search-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, location, or interests..."
              className="search-input"
            />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          <div className="filter-groups">
            <div className="filter-group">
              <label>Age Range</label>
              <div className="range-inputs">
                <input type="number" placeholder="Min" className="filter-input" min="18" max="100" />
                <span>to</span>
                <input type="number" placeholder="Max" className="filter-input" min="18" max="100" />
              </div>
            </div>

            <div className="filter-group">
              <label>Denomination</label>
              <select className="filter-input">
                <option value="">All Denominations</option>
                <option value="catholic">Catholic</option>
                <option value="protestant">Protestant</option>
                <option value="orthodox">Orthodox</option>
                <option value="evangelical">Evangelical</option>
                <option value="baptist">Baptist</option>
                <option value="methodist">Methodist</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="City or Country" className="filter-input" />
            </div>
          </div>
        </div>
      );
    }

    export default SearchFilters;
