import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";

import logo from "../../public/logo.png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const sharedLinks = (
  <>
    <li>
      <Link to={"/"}>
        <FaHome className="text-2xl" />
        Home
      </Link>
    </li>
    <li>
      <Link to={"/menu"}>
        <IoIosMenu className="text-2xl" />
        Menu
      </Link>
    </li>
    <li>
      <Link to={"/order-tracking"}>
        <FaLocationDot className="text-2xl" />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to={"/customer-support"}>
        <FaQuestionCircle className="text-2xl" />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  if (loading || isAdminLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4 w-full lg:hidden bg-white p-4 rounded-xl shadow-sm mb-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <TfiMenuAlt className="text-xl" />
            </label>
            <img src={logo} alt="" className="w-20" />
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm text-red"
            >
              <FiLogOut className="text-xl" />
            </button>
          </div>

          {/* Read-only Alert for non-admins */}
          {!isAdmin && (
            <div className="mx-4 md:mx-8 mb-4">
              <div className="alert alert-info shadow-lg bg-blue-50 border-blue-200 text-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  <strong>Note:</strong> You are viewing the Admin Panel in{" "}
                  <strong>Read-Only</strong> mode. Actions are restricted to
                  Admin users only.
                </span>
              </div>
            </div>
          )}

          <div className="px-4 md:px-8">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white text-base-content min-h-full w-72 p-6 shadow-2xl border-r border-gray-100">
            {/* Sidebar Header */}
            <div className="mb-10 px-2 flex items-center gap-3">
              <img src={logo} alt="" className="w-24" />
              <div className="flex flex-col">
                <span className="badge bg-green/10 text-green border-none py-3 px-4 font-bold text-xs uppercase tracking-wider">
                  Dashboard
                </span>
                {!isAdmin && (
                  <span className="text-[10px] text-blue-500 font-bold ml-1 mt-1 uppercase">
                    Read-Only
                  </span>
                )}
              </div>
            </div>

            {/* Sidebar Links */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
                Main Menu
              </p>
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center gap-4 py-3 hover:bg-green/5 hover:text-green rounded-xl transition-all group"
                >
                  <MdSpaceDashboard className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Stats Overview</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/bookings"}
                  className="flex items-center gap-4 py-3 hover:bg-green/5 hover:text-green rounded-xl transition-all group"
                >
                  <GiShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Bookings Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/add-menu"}
                  className="flex items-center gap-4 py-3 hover:bg-green/5 hover:text-green rounded-xl transition-all group"
                >
                  <FaPlusCircle className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Add New Item</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/manage-items"}
                  className="flex items-center gap-4 py-3 hover:bg-green/5 hover:text-green rounded-xl transition-all group"
                >
                  <FaEdit className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Menu Inventory</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/users"}
                  className="flex items-center gap-4 py-3 hover:bg-green/5 hover:text-green rounded-xl transition-all group"
                >
                  <FaUsers className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">User Directory</span>
                </Link>
              </li>
            </div>

            <div className="my-8 border-t border-gray-100 mx-4"></div>

            {/* Shared Links */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
                Quick Access
              </p>
              {sharedLinks}
            </div>

            {/* Logout Button at bottom */}
            <div className="mt-auto pt-10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 py-3 px-4 text-red bg-red-50 hover:bg-red-100 rounded-xl transition-all font-bold group"
              >
                <FiLogOut className="text-xl group-hover:translate-x-1 transition-transform" />
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
