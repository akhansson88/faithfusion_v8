import React from 'react';

    function SearchResultsInfo({ profiles }) {
      return (
        <div className="search-results-info">
          <p>Showing {profiles.length} matches</p>
          <select className="sort-select">
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      );
    }

    export default SearchResultsInfo;
