import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const { sendPasswordReset } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await sendPasswordReset(data.email);
      alert("Password reset link sent. Check your email.");
      navigate("/login");
    } catch (err) {
      alert("Failed to send reset email. Please check the address.");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg">Forgot Password</h3>
        <p className="my-2">Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              required
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Send Reset Link"
              className="btn bg-green text-white text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

