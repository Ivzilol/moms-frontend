import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderCard from '../../components/orderCard/OrderCard';
import sampleOrders from './sampleOrders.json'; // Import the orders data

const ITEMS_PER_PAGE = 15; // Number of cards per page

const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last card to be displayed on the current page
  const indexOfLastOrder = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ITEMS_PER_PAGE;
  const currentOrders = sampleOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sampleOrders.length / ITEMS_PER_PAGE);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {currentOrders.map((order, index) => (
          <div key={index} className="col-md-4 mb-4">
            <OrderCard order={order} />
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo; Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next &raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OrderPage;
