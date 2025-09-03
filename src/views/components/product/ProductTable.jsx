import React from "react";

// ** Fake DB
import { fakeData } from "../../../@core/fakedb/product";

fakeData;

const ProductTable = () => {
  return (
    <div className="py-6 px-8">
      <div className="overflow-x-auto shadow-lg">
        <table className="table ">
          {/* head */}
          <thead className="bg-base-300">
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Description</th>
              <th>Available Stock</th>
              <th>Unit Sold</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {fakeData.map((product, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.costPrice}</td>
                <td>{product.sellingPrice}</td>
                <td>{product.description}</td>
                <td>{product.availableStock}</td>
                <td>{product.unitSold}</td>
                <td className="flex gap-2">
                  <button className="btn btn-circle table-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fill="currentColor"
                        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3"
                      ></path>
                    </svg>
                  </button>
                  <button className="btn btn-circle table-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fill="currentColor"
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
                      ></path>
                    </svg>
                  </button>
                  <button className="btn btn-circle table-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      className="text-red-600"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1M6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
