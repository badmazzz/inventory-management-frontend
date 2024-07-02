import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../Component/AddProduct";
import UpdateProduct from "../Component/UpdateProduct";
import { StoreContext } from "../context/StoreContext";

function Inventory() {
  const {
    fetchProductsData,
    fetchStoresData,
    products,
    stores,
    deleteItem,
    fetchSearchData,
    updatePage,
    fetchSellData,
    sellData,
    showProductModal,
    addProductModalSetting,
  } = useContext(StoreContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProductsData();
    fetchStoresData();
    fetchSellData();
  }, [updatePage]);

  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData(searchTerm, e.target.value);
  };

  const totalProductsSold = sellData.reduce(
    (acc, sale) => acc + sale.stockSold,
    0
  );

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Total Products
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Last 7 days
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Stores
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {stores.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                All Available Stores
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Products Sold
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {totalProductsSold}
              </span>
              <span className="font-thin text-gray-400 text-xs">All Time</span>
            </div>
          </div>
        </div>

        {/* Add Product Modal */}
        {showProductModal && (
          <AddProduct
            handleModal={addProductModalSetting}
            fetchProductsData={fetchProductsData}
          />
        )}

        {/* Update Product Modal */}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        {/* Inventory Management */}
        <div className="flex justify-between">
          <div>
            <button
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              onClick={addProductModalSetting}
            >
              Add Product
            </button>
          </div>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Manufacturer
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Availabily
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.manufacturer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock > 0 ? "In Stock" : "Not in Stock"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 text-xs rounded mr-2"
                        onClick={() => updateProductModalSetting(element)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 text-xs rounded"
                        onClick={() => deleteItem(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
