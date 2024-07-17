import React from "react";
import toast from "react-hot-toast";
import { UserTypes } from "../../type";
import { auth } from "../lib/firebase";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";

const UserInfo = ({ currentUser }: UserTypes) => {
  return (
    <div className="bg-[#004437] text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={
              currentUser?.avatar
                ? currentUser?.avatar
                : "https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            }
            alt="userImage"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-gray-400 text-sm">Welcome back!</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        <Link
          to={"/dashboard"}
          className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          <FiUser className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link
          to={"/dashboard"}
          className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          <FiUser className="mr-3" />
          <span>Market</span>
        </Link>
        <Link
          to={"/favorite"}
          className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          <FiStar className="mr-3" />
          <span>Favorites</span>
        </Link>
        <Link
          to={"/cart"}
          className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          <FiShoppingBag className="mr-3" />
          <span>Cart</span>
        </Link>

        <button className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 w-full justify-between">
          <div className="flex items-center">
            <FiUser className="mr-3" />
            <span>orders</span>
          </div>
          
        </button>
        <button
          onClick={() => auth.signOut()}
          className="bg-[#004437] hover:bg-[#004437] text-white font-bold py-2 px-4 rounded text-sm mt-auto w-full"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default UserInfo;
