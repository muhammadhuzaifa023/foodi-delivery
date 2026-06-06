import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaBook,
  FaDollarSign,
  FaUsers,
  FaUtensils,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/stats");
      return res.data;
    },
  });

  const { data: recentOrders = [] } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data.slice(0, 5); // Just top 5 for dashboard
    },
  });

  return (
    <div className="w-full md:w-[950px] px-4 mx-auto py-8">
      {/* Welcome Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-green">{user.displayName}</span>{" "}
            👋
          </h2>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <span className="w-3 h-3 bg-green rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-gray-600">
            Live Status: Active
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-orange-400 hover:translate-y-[-5px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
              <FaDollarSign className="text-2xl" />
            </div>
            <span className="text-green flex items-center gap-1 text-sm font-bold bg-green/10 px-2 py-1 rounded-lg">
              <FaArrowUp /> 12%
            </span>
          </div>
          <p className="text-gray-500 font-medium">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            ${stats.revenue?.toLocaleString()}
          </h3>
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-blue-400 hover:translate-y-[-5px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <FaUsers className="text-2xl" />
            </div>
            <span className="text-green flex items-center gap-1 text-sm font-bold bg-green/10 px-2 py-1 rounded-lg">
              <FaArrowUp /> 8%
            </span>
          </div>
          <p className="text-gray-500 font-medium">Total Users</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {stats.users}
          </h3>
        </div>

        {/* Menu Items Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-purple-400 hover:translate-y-[-5px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
              <FaUtensils className="text-2xl" />
            </div>
            <span className="text-gray-500 flex items-center gap-1 text-sm font-bold bg-gray-100 px-2 py-1 rounded-lg">
              New
            </span>
          </div>
          <p className="text-gray-500 font-medium">Menu Items</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {stats.menuItems}
          </h3>
        </div>

        {/* Orders Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-green hover:translate-y-[-5px] transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green/10 rounded-xl text-green">
              <FaShoppingCart className="text-2xl" />
            </div>
            <span className="text-green flex items-center gap-1 text-sm font-bold bg-green/10 px-2 py-1 rounded-lg">
              <FaArrowUp /> 15%
            </span>
          </div>
          <p className="text-gray-500 font-medium">Total Orders</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {stats.orders}
          </h3>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          <button className="text-green font-semibold hover:underline text-sm">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="font-semibold py-4">USER</th>
                <th className="font-semibold py-4">PRICE</th>
                <th className="font-semibold py-4 text-center">STATUS</th>
                <th className="font-semibold py-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green/10 text-green flex items-center justify-center font-bold">
                        {item.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {item.email}
                      </span>
                    </div>
                  </td>
                  <td className="font-bold text-gray-800">${item.price}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? (
                      <span className="badge badge-success gap-1 text-white py-3 px-4 border-none bg-green">
                        <FaCheckCircle className="text-[10px]" /> {item.status}
                      </span>
                    ) : (
                      <span className="badge badge-warning gap-1 text-white py-3 px-4 border-none bg-orange-400">
                        <FaClock className="text-[10px]" /> {item.status}
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <button className="btn btn-ghost btn-xs text-blue-500 font-bold">
                      Details
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
};

export default Dashboard;
