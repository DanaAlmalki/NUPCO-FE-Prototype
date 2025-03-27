import React from "react";

export default function BrandsTable({ brands }) {
  return (
    <div>
      {/* Brands Table  */}
      <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
        <div className="flex justify-between pt-5 pb-3 px-3">
          <div className="flex gap-4 justify-center items-center ">
            <span className="font-bold">Brands</span>
            <div className="flex justify-center items-center px-2 border-2 rounded-md ">
              <img
                alt="search-icon"
                className="w-5 h-5"
                src={require("../assets/search-icon.png")}
              />
              <input
                className="border-none outline-none focus:border-none text-xs"
                type="text"
                placeholder="Search here"
                //value={searchTerm}
                //onChange={handleSearchTerm}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-custom-orange hover:bg-cloud-burst text-white font-bold p-2 text-xs  rounded"
              //onClick={addProductModalSetting}
            >
              {/* <Link to="/inventory/add-product">Add Product</Link> */}
              Add Brand
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Brand
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                More
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {brands.map((element, index) => {
              return (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {element.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-green-700 cursor-pointer"
                      //onClick={() => updateProductModalSetting(element)}
                    >
                      Edit{" "}
                    </span>
                    <span
                      className="text-red-600 px-2 cursor-pointer"
                      //onClick={() => deleteItem(element._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
