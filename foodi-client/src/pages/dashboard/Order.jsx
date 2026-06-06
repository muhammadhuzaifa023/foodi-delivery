import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  console.log(orders);

  const formattedDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className=" space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your
              <span className="text-green"> Orders!</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white text-base">
                  <tr>
                    <th>#</th>
                    <th>Order Date</th>
                    <th>transitionId</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formattedDate(item.createdAt)}</td>
                      <td className="font-medium">{item.transitionId}</td>
                      <td>${item.price}</td>
                      <td>{item.status}</td>
                      <th>
                        <Link
                          to={"#"}
                          className="btn text-[red] btn-ghost btn-xs"
                        >
                          Contact
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-6xl font-semibold text-slate-200 mb-36">
            Cart is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
