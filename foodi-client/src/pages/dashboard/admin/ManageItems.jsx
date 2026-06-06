import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useAdmin from "../../../hooks/useAdmin";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const [isAdmin] = useAdmin();
  console.log(menu);
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    if (!isAdmin) {
      Swal.fire({
        icon: "info",
        title: "Read-only Mode",
        text: "You cannot delete items in read-only mode.",
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
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        refetch
        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        {isAdmin ? "Manage" : "View"} <span className="text-green">Menu Items</span>
      </h2>

      {/* menu item table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                {isAdmin && <th>Edit</th>}
                {isAdmin && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  {isAdmin && (
                    <td>
                      <Link to={`/dashboard/update-menu/${item._id}`}>
                        <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                          <FaEdit className="text-lg" />
                        </button>
                      </Link>
                    </td>
                  )}
                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn btn-ghost btn-xs text-orange-500"
                      >
                        <FaTrashAlt className="text-lg" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
