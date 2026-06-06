import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const { signUpWithGmail, login, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  // redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          alert("Sign In successfull!");
          navigate(from, { replace: true });
          // return <Navigate to={from} state={{ from: location }} replace></Navigate>
        });
        // alert("Login Successfully");
        // document.getElementById("my_modal_3").close();
        // navigate(from, { replace: true });
        // navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Invalid email and password!");
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
          alert("Sign In successfull!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-md w-full mx-auto flex justify-center items-center ">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <button
              onClick={navigate(from, { replace: true })}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Please Login!</h3>
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
              <label className="label mt-1 ">
                <Link to="/forgot-password" className="label-text-alt link link-hover text-[16px]">
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* error */}
            {errorMessage ? (
              <p className="text-red text-sm italic">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white text-lg"
              />
            </div>

            {/* sign up */}
            <p className="text-center my-2">
              Donot have an account?
              <Link to={"/signup"} className="text-red ml-1 underline">
                Sign Up
              </Link>
            </p>
          </form>

          {/* social sign in */}
          <div className="flex items-center w-full justify-center gap-4 my-4 pt-4">
            <button
              className="btn text-lg hover:bg-green w-full  hover:text-white"
              onClick={handleRegister}
            >
              <FcGoogle className="text-2xl" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
