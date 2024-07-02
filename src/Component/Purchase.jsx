import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import AddPurchaseDetails from "../Component/AddPurchaseDetails";
import EditPurchaseDetails from "../Component/EditPurchaseDetails";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);
  const { purchaseData, fetchPurchaseData, deletePurchase } =
    useContext(StoreContext);

  useEffect(() => {
    fetchPurchaseData();
  }, []);

  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const editPurchaseModalSetting = (purchase) => {
    setEditPurchase(purchase);
    setShowEditModal(!showEditModal);
  };

  const handleDelete = (id) => {
    deletePurchase(id);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails addSaleModalSetting={addSaleModalSetting} />
        )}
        {showEditModal && (
          <EditPurchaseDetails
            editPurchaseModalSetting={editPurchaseModalSetting}
            purchase={editPurchase}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Purchase Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addSaleModalSetting}
              >
                Add Purchase
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity Purchased
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Purchase Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {purchaseData.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.product.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(element.createdAt).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "Today"
                      : new Date(element.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${element.totalAmount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 text-xs rounded mr-2"
                      onClick={() => editPurchaseModalSetting(element)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 text-xs rounded"
                      onClick={() => handleDelete(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
