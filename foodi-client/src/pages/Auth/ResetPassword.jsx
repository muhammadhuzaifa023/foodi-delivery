import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

const ResetPassword = () => {
  const auth = getAuth(app);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("oobCode");
    if (!code) {
      alert(
        "Reset code missing! Please click the link directly from your email.",
      );
      navigate("/login");
      return;
    }
    setOobCode(code);
    verifyPasswordResetCode(auth, code)
      .then((mail) => setEmail(mail))
      .catch((err) => {
        console.error(err);
        alert("Reset link is invalid or expired.");
        navigate("/login");
      });
  }, [location.search, auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, password);
      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (e1) {
      console.error(e1);
      alert("Failed to reset password: " + e1.message);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg">Reset Password</h3>
        <p className="my-2">Account: {email || "Loading..."}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white text-lg" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
