import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function EditPurchaseDetails({ editPurchaseModalSetting, purchase }) {
  const [product, setProduct] = useState(purchase.product);
  const [quantity, setQuantity] = useState(purchase.quantity);
  const [totalAmount, setTotalAmount] = useState(purchase.totalAmount);
  const { updatePurchaseDetails } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPurchase = {
      ...purchase,
      product,
      quantity,
      totalAmount,
    };
    updatePurchaseDetails(updatedPurchase);
    editPurchaseModalSetting(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Edit Purchase Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              disabled={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded"
              onClick={() => editPurchaseModalSetting(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPurchaseDetails;
