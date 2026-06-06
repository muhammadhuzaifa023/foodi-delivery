import { useQuery } from "@tanstack/react-query";
import { GrUserAdmin } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useAdmin from "../../../hooks/useAdmin";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  console.log(users);

  const handleMakeAdmin = (user) => {
    if (!isAdmin) {
      alert("Read-only mode: You cannot perform this action.");
      return;
    }
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleUserDelete = (user) => {
    if (!isAdmin) {
      alert("Read-only mode: You cannot perform this action.");
      return;
    }
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.name} is deleted from database`);
      refetch();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5 className="font-bold text-lg">All Users</h5>
        <h5 className="font-semibold text-lg">
          Total Users: <span className="text-green">{users.length}</span>
        </h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg text-base">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{user.name}</th>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs btn-circle bg-indigo-500 text-white font-bold"
                      >
                        <GrUserAdmin />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleUserDelete(user)}
                      className="btn btn-xs  bg-orange-500 text-white font-bold"
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

export default Users;
