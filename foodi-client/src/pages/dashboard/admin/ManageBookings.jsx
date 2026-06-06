import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import useAdmin from "../../../hooks/useAdmin";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  const handleStatusUpdate = async (order, newStatus) => {
    if (!isAdmin) {
      Swal.fire({
        icon: "info",
        title: "Read-only Mode",
        text: "You cannot update status in read-only mode.",
      });
      return;
    }
    try {
      await axiosSecure.patch(`/payments/${order._id}`, { status: newStatus });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Status updated to ${newStatus}!`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrder = async (order) => {
    if (!isAdmin) {
      Swal.fire({
        icon: "info",
        title: "Read-only Mode",
        text: "You cannot delete bookings in read-only mode.",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // You might need a delete endpoint on server too, but for now we'll focus on status change
        // For now let's just show the confirm status update as requested
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Bookings!</span>
      </h2>

      {/* table */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.transitionId}</td>
                  <td>${item.price}</td>
                  <td>
                    <select
                      className="select select-bordered select-xs w-full max-w-xs"
                      value={item.status}
                      onChange={(e) => handleStatusUpdate(item, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cooking">Cooking</option>
                      <option value="on the way">On the way</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="text-center text-green font-bold">
                    {item.status === "delivered" ? "Completed" : "Active"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteOrder(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
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

export default ManageBookings;
