import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const Card = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  // console.log(item);

  const [isHeartFiltered, setIsHeartFiltered] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(user);

  const handleHeartClick = () => {
    setIsHeartFiltered(!isHeartFiltered);
  };

  // add to cart
  const handleAddToCart = async (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        recipe,
        email: user.email,
      };
      console.log("cart that has to sent to backend ", cartItem);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      const data = await res.json();

      console.log("cart receiving from backend ", data);
      if (data.success === true) {
        if (data) {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      if (data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Item Alert",
          text: data.message,
        });
      }
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Without login can't able to add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 mr-5 shadow-xl relative md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFiltered ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the items</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddToCart(item)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
