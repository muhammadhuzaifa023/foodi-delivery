import React from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <Link to="/menu">All</Link>
            </li>
            <li>
              <Link to="/menu?category=salad">Salad</Link>
            </li>
            <li>
              <Link to="/menu?category=pizza">Pizza</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <Link to="/menu">Online Order</Link>
            </li>
            <li>
              <Link to="/order-tracking">Order Tracking</Link>
            </li>
            <li>
              <Link to="/customer-support">Customer Support</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to="/menu?category=offered">Offers</Link>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
    </>
  );
};

export default Logo;
