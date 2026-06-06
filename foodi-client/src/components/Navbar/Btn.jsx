import React from "react";
import { FaUserCircle } from "react-icons/fa";
import SignIn from "../Modal/SignIn";

const Btn = () => {
  return (
    <>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="btn bg-green rounded-full px-6 text-white flex items-center gap-2"
      >
        <span className="text-xl">
          <FaUserCircle />
        </span>
        Login
      </button>

      {/* Modal */}
      <SignIn/>
    </>
  );
};

export default Btn;
