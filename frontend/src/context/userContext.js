import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../api/restapi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logoutUser = async () => {
    await LogoutUser();
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const loginUser = (data) => {
    setLoggedInUser(data);
  };

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
