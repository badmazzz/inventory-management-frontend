import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { StoreContext } from "../context/StoreContext";

export default function UpdateProduct({ updateProductData }) {
  const { _id, name, manufacturer, description } = updateProductData;
  const [product, setProduct] = useState({
    productId: _id,
    name: name,
    manufacturer: manufacturer,
    description: description,
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const { updateProductDetails } = useContext(StoreContext);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleUpdate = () => {
    updateProductDetails(product);
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Update Product
                    </Dialog.Title>
                  </div>
                </div>
                <div className="flex flex-col gap-5 py-4 px-10">
                  <input
                    className="rounded border border-gray-400 py-2 px-3"
                    value={product.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Product Name"
                  />
                  <input
                    className="rounded border border-gray-400 py-2 px-3"
                    value={product.manufacturer}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    placeholder="Manufacturer"
                  />
                  <input
                    className="rounded border border-gray-400 py-2 px-3"
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Description"
                  />
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
