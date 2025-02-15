import React from 'react';

    function Pagination() {
      return (
        <div className="pagination">
          <button className="pagination-btn">&lt;</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <span>...</span>
          <button className="pagination-btn">12</button>
          <button className="pagination-btn">&gt;</button>
        </div>
      );
    }

    export default Pagination;
