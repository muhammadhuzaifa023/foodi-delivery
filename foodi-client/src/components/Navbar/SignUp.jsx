import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import SignIn from "../Modal/SignIn";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  // redirecting to home page or specific page
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const name = result.name;
        updateUserProfile(data.email, data.photoURL);
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          alert("Sign Up successfull!");
          navigate(from, { replace: true });
        });
        // alert("Account created successfully done!");
        // document.getElementById("my_modal_3").close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // google signin
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          alert("Sign Up successfull!");
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-md w-full mx-auto flex justify-center items-center ">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <Link
              to={"/"}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
            <h3 className="font-bold text-lg">Create an Account</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                {...register("name")}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email")}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password")}
                required
              />
            </div>

            {/* error */}

            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign Up"
                className="btn bg-green text-white text-lg"
              />
            </div>

            {/* sign up */}
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="text-center my-2"
            >
              Already have an account?
              <Link to={"/login"} className="text-red ml-1 underline">
                Login
              </Link>
            </button>
          </form>

          {/* social sign in */}
          <div className="flex items-center w-full justify-center gap-4 my-4 pt-5">
            <button
              onClick={handleRegister}
              className="btn text-lg hover:bg-green w-full  hover:text-white"
            >
              <FcGoogle className="text-2xl" />
              Google
            </button>
          </div>
        </div>
      </div>
      <SignIn />
    </div>
  );
};

export default SignUp;
