import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaUser, FaCamera, FaLock, FaBell } from "react-icons/fa";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: user?.displayName,
      photoURL: user?.photoURL,
    },
  });

  const photoURLValue = watch("photoURL");

  const onSubmit = (data) => {
    updateUserProfile(data.name, data.photoURL)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile info has been saved successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="section-container py-24 bg-gray-50 min-h-screen mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          Your <span className="text-green">Profile</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Tabs (Visual Only for now) */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-6 py-3 bg-white text-green font-bold rounded-xl shadow-sm border border-green/20">
              <FaUser /> Profile Info
            </button>
            <button className="w-full flex items-center gap-3 px-6 py-3 bg-white text-gray-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              <FaLock /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-6 py-3 bg-white text-gray-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              <FaBell /> Notifications
            </button>
          </div>

          {/* Form Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="relative group">
                    <img
                      src={
                        photoURLValue ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-green/20"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <FaCamera className="text-white text-xl" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Update your profile picture
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-600">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className="input input-bordered focus:border-green focus:outline-none rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-600">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered bg-gray-50 cursor-not-allowed rounded-xl"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      Email cannot be changed for social accounts.
                    </span>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-600">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("photoURL")}
                      className="input input-bordered focus:border-green focus:outline-none rounded-xl"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex gap-4">
                  <button
                    type="submit"
                    className="btn bg-green text-white px-8 rounded-full border-none hover:bg-green/90"
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-ghost px-8 rounded-full"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
              <h4 className="text-red-600 font-bold mb-2">Danger Zone</h4>
              <p className="text-xs text-red-500 mb-4">
                Deleting your account is permanent and cannot be undone.
              </p>
              <button className="btn btn-sm bg-red-600 text-white border-none hover:bg-red-700 rounded-lg">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
