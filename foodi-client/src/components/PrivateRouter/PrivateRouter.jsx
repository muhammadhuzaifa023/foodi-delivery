import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  // console.log("user", user);
  // console.log("loading", loading);

  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (user) {
    return children;
  } else {
    return (
      <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
  }
};

export default PrivateRouter;
