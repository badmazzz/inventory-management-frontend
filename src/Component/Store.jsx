import React, { useState, useEffect, useContext } from "react";
import AddStore from "../Component/AddStore";
import { StoreContext } from "../context/StoreContext";
import locationIcon from "../assets/location-icon.png";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const { stores, fetchStoresData, user } = useContext(StoreContext);

  useEffect(() => {
    fetchStoresData(user);
  }, [user]);

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12 border-2 p-5">
        <div className="flex justify-between">
          <span className="font-bold text-xl">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
            onClick={modalSetting}
          >
            Add Store
          </button>
        </div>
        {showModal && <AddStore />}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">City</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((element) => (
              <tr key={element._id}>
                <td className="py-2 px-4 border-b">{element.name}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <img
                    alt="location-icon"
                    className="h-6 w-6 mr-2"
                    src={locationIcon}
                  />
                  {element.address}
                </td>
                <td className="py-2 px-4 border-b">{element.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Store;
