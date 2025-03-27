import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";

function SideMenu() {
  return (
    <div className="h-full flex-col justify-between  bg-cloud-burst hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100  hover:text-gray-700 px-4 py-2 text-white"
          >
            <GoHome />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <MdOutlineInventory2 />
                  <span className="text-sm font-medium"> Inventory </span>
                </div>
              </Link>
            </summary>
          </details>

          <Link
            to="/purchase-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
          >
            <BsBoxes />
            <span className="text-sm font-medium"> Purchase Details</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
          >
            <MdOutlineSell />
            <span className="text-sm font-medium"> Sales</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default SideMenu;
