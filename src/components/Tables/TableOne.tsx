import React, { useState, useEffect } from 'react';
import { BRAND } from '../../types/brand';
import axios from 'axios';
import OrderService from '../../database/OrderService';
import ReactPaginate from 'react-paginate';
import "../../css/pagination-style.css"

const TableOne = () => {
  const [brandData, setBrandData] = useState<BRAND[]>([]);

  const [data, setData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * rowsPerPage;
  const currentPageData = data.slice(offset, offset + rowsPerPage);

  useEffect(() => {
    const unsubscribe = OrderService.getAllOrders().then((orders) => {
      const fmtOrders = orders.docs.map((row) => ({
        ...row.data(),
        id: row.id,
        totalAmount: `₹ ${row.data().cartTotal}`,
        createdAt: row.data().createdAt.toDate().toLocaleString(),
        totalQty: row.data().cart.length,
      }));
      var orderByDate = fmtOrders
        .sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        })
        .reverse();
      setData(orderByDate);
      console.log(orderByDate, 'orderByDate');
    });
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <div className="flex flex-col">
        <table>
          <thead className="rounded-sm bg-gray-2 dark:bg-meta-4">
            <tr>
              <th>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base text-left">
                    Bill No
                  </h5>
                </div>
              </th>
              <th>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base text-left">
                    Quantity
                  </h5>
                </div>
              </th>
              <th>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base text-left">
                    Amount
                  </h5>
                </div>
              </th>
              <th>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base text-left">
                    Payment Method
                  </h5>
                </div>
              </th>
              <th>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base text-left">
                    Status
                  </h5>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row: any, index: any) => (
              <tr key={index}>
                <td>
                  <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {row.billNo}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {row.totalQty}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {row.totalAmount}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {row.paymentMode}
                    </h5>
                  </div>
                </td>
                <td>
                  <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {row.paymentStatus}
                    </h5>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        breakLabel={'...'}
        pageCount={Math.ceil(data.length / rowsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default TableOne;
