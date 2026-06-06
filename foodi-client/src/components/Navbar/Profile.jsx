import { useContext } from "react";
import { FaUser } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    console.log("logout clicked");

    logOut()
      .then(() => {
        alert("Logged out successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://tse1.mm.bing.net/th?id=OIP.vgpw3aE0iPYJQXPPD5CnWwAAAA&pid=Api&P=0&h=220"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-lg  min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/update-profile" className="flex items-center">
                <FaUser className="text-2xl" />
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/order"} className="flex items-center">
                <HiShoppingCart className="text-2xl" />
                Orders
              </Link>
            </li>
            <li>
              <Link to={"/menu"} className="flex items-center">
                <IoTicketOutline className="text-2xl" />
                Vouchers
              </Link>
            </li>
            <li>
              <Link to={"/dashboard"} className="flex items-center">
                <MdSpaceDashboard className="text-2xl" />
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center text-red hover:bg-red hover:text-white"
              >
                <FiLogOut className="text-2xl font-extrabold" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
