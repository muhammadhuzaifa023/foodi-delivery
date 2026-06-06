import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaCheckCircle,
  FaTruck,
  FaUtensils,
  FaClock,
  FaTimes,
} from "react-icons/fa";

const OrderTracking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOrder]);

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  const getStatusStep = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "order pending":
        return 1;
      case "confirmed":
        return 2;
      case "cooking":
        return 3;
      case "on the way":
        return 4;
      case "delivered":
        return 5;
      default:
        return 1;
    }
  };

  const steps = [
    { label: "Pending", icon: FaClock },
    { label: "Confirmed", icon: FaCheckCircle },
    { label: "Cooking", icon: FaUtensils },
    { label: "On the way", icon: FaTruck },
    { label: "Delivered", icon: FaCheckCircle },
  ];

  return (
    <div className="section-container py-24 min-h-screen bg-gray-50 mt-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Order <span className="text-green">Tracking</span>
        </h2>
        <p className="text-gray-600">
          Real-time updates on your delicious meals.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {orders.length > 0 ? (
          orders.map((order, idx) => {
            const currentStep = getStatusStep(order.status);
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      Order ID
                    </p>
                    <h4 className="text-xl font-bold text-gray-800">
                      #{order.transitionId.slice(0, 10)}...
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      Status
                    </p>
                    <span className="badge badge-success bg-green text-white py-3 px-6 border-none font-bold capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative flex justify-between items-center w-full px-4">
                  {/* Line Background */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
                  {/* Active Line */}
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-green -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out rounded-full"
                    style={{
                      width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                  ></div>

                  {/* Steps */}
                  {steps.map((step, sIdx) => {
                    const Icon = step.icon;
                    const isActive = sIdx + 1 <= currentStep;
                    return (
                      <div
                        key={sIdx}
                        className="relative z-10 flex flex-col items-center group"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${isActive ? "bg-green border-green text-white scale-110 shadow-lg" : "bg-white border-gray-100 text-gray-300"}`}
                        >
                          <Icon className="text-lg" />
                        </div>
                        <p
                          className={`absolute -bottom-8 text-xs font-bold whitespace-nowrap uppercase tracking-tighter ${isActive ? "text-green" : "text-gray-300"}`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-16 pt-8 border-t border-gray-50 flex justify-between items-center">
                  <p className="text-gray-500 font-medium">
                    Total Amount:{" "}
                    <span className="text-gray-800 font-bold">
                      ${order.price}
                    </span>
                  </p>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-ghost text-green font-bold hover:bg-green/5 rounded-full px-6"
                  >
                    View Order Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <FaTruck className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400">
              No Active Orders
            </h3>
            <p className="text-gray-500 mt-2">
              Hungry? Go place some orders first!
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-xl">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 relative z-[10000]">
            {/* Modal Header */}
            <div className="bg-green p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Order Details</h3>
                <p className="text-green-50 text-sm">
                  #{selectedOrder.transitionId}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Status
                  </p>
                  <p className="text-lg font-bold text-green capitalize">
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Date
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(selectedOrder.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Ordered Items
                </h4>
                <div className="space-y-4">
                  {selectedOrder.orderItems &&
                  selectedOrder.orderItems.length > 0
                    ? selectedOrder.orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl shadow-sm"
                            />
                            <div>
                              <p className="font-bold text-gray-700">
                                {item.name}
                              </p>
                              <p className="text-gray-400 text-sm">
                                ${item.price} x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-green font-bold bg-white px-3 py-1 rounded-full border border-gray-100">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))
                    : selectedOrder.itemName.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center text-green font-bold">
                              {index + 1}
                            </div>
                            <p className="font-bold text-gray-700">{item}</p>
                          </div>
                          <p className="text-gray-400 text-sm">Qty: 1</p>
                        </div>
                      ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white p-6 mt-16 rounded-3xl flex justify-between items-center shadow-lg">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Paid
                  </p>
                  <p className="text-3xl font-bold">
                    $
                    {selectedOrder.orderItems &&
                    selectedOrder.orderItems.length > 0
                      ? selectedOrder.orderItems
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0,
                          )
                          .toFixed(2)
                      : selectedOrder.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Items
                  </p>
                  <p className="text-xl font-bold">
                    {selectedOrder.orderItems &&
                    selectedOrder.orderItems.length > 0
                      ? selectedOrder.orderItems.reduce(
                          (total, item) => total + item.quantity,
                          0,
                        )
                      : selectedOrder.quantity}{" "}
                    Items
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn bg-green hover:bg-green/90 text-white border-none px-10 rounded-full font-bold shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
