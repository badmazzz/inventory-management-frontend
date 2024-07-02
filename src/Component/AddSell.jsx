import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const AddSell = ({ addSellModalSetting }) => {
  const { products, stores, addSell } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    productId: "",
    storeId: "",
    stockSold: "",
    totalSellAmount: "",
    sellDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSell(formData);
      toast.success("Sell added successfully!");
      addSellModalSetting();
    } catch (error) {
      toast.error("Failed to add sell.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Add Sell</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Store</label>
            <select
              name="storeId"
              value={formData.storeId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock Sold</label>
            <input
              type="number"
              name="stockSold"
              value={formData.stockSold}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Sell Amount</label>
            <input
              type="number"
              name="totalSellAmount"
              value={formData.totalSellAmount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sell Date</label>
            <input
              type="date"
              name="sellDate"
              value={formData.sellDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded"
              onClick={addSellModalSetting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              Add Sell
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSell;
