import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function AddStore() {
  const { addStore } = useContext(StoreContext);
  const [storeData, setStoreData] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setStoreData({ ...storeData, [name]: files[0] });
    } else {
      setStoreData({ ...storeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStore(storeData);
    setStoreData({
      name: "",
      category: "",
      address: "",
      city: "",
      image: null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Store</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={storeData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={storeData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={storeData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={storeData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              Add Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStore;
