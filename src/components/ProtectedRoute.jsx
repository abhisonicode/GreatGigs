import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

export const ProtectedRoute = ({
  preventLoggedIn,
  sellerProtected,
  isPublic,
  children,
}) => {
  const { loggedInUser } = useContext(UserContext);

  if (preventLoggedIn && loggedInUser) {
    return <Navigate to="/" />;
  }
  if (!loggedInUser?.isSeller && sellerProtected) {
    return <Navigate to="/login" />;
  }
  if (isPublic) {
    return children;
  }
  return loggedInUser ? children : <Navigate to="/login" />;
};
