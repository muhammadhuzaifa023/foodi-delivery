import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import SearchIcon from "./SearchIcon";
import CartItem from "./CartItem";
import Btn from "./Btn";
import { AuthContext } from "../../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const { user } = useAuth();

  const [cart, refetch] = useCart();

  // handle scroll function
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full transition-all duration-300 ease-in-out z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div
          className={`navbar xl:px-24 ${
            isSticky ? "shadow-md bg-base-100 transition-all duration-300" : ""
          }`}
        >
          <Logo />
          <div className="navbar-end">
            <SearchIcon />
            <Link to={"cart-page"}>
              <CartItem cart={cart} />
            </Link>
            {user ? <Profile user={user} /> : <Btn />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

