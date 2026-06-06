import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          // refetch();
          setCartItems(updatedCart);
        });
      return refetch();
    }
  };

  const handleIncrease = (item) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        // refetch();
      });
    refetch();
  };

  // calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  return (
    <div className="section-container">
      {/* banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className=" space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to the
              <span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      <div>
        {cart.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead className="bg-green text-white text-base">
                  <tr>
                    <th className="hidden md:table-cell">#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th className="text-center">Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="hidden md:table-cell">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-sm md:text-base">{item.name}</td>
                      <td>
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="btn btn-xs md:btn-sm btn-ghost bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            -
                          </button>
                          <span className="w-6 md:w-10 text-center font-semibold text-sm md:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="btn btn-xs md:btn-sm btn-ghost bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-sm md:text-base font-bold text-gray-700">
                        ${calculatePrice(item).toFixed(2)}
                      </td>
                      <th>
                        <button
                          className="btn text-red hover:bg-red/10 btn-ghost btn-xs md:btn-sm"
                          onClick={() => handleDelete(item)}
                        >
                          <MdDelete className="text-xl md:text-2xl" />
                        </button>
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

      {/* customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-bold">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-bold">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${orderTotal.toFixed(2)}</p>
          <Link to={"/process-checkout"}>
            <button className="btn bg-green text-white mt-5">
              Procceed Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
