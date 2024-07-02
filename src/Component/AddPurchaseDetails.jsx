import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const AddPurchaseDetails = ({ addSaleModalSetting }) => {
  const { products, addPurchase, fetchPurchaseData } = useContext(StoreContext);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchaseData = {
      productId,
      quantity,
      purchaseDate,
      totalAmount,
    };
    await addPurchase(purchaseData);
    fetchPurchaseData();
    addSaleModalSetting();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Purchase</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="block w-full border rounded p-2"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="block w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="block w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addSaleModalSetting}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchaseDetails;
