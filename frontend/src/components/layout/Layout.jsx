import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import ThemeContext from "../../context/themeContext";
import Navbar from "../navbar/Navbar";
import { UserProvider } from "../../context/userContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Layout = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  const setSearchFocus = (newValue) => {
    setIsSearchFocused(newValue);
  };

  const setNavbarActive = (newValue) => {
    setIsNavbarActive(newValue);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <ThemeContext.Provider
            value={{
              isSearchFocused,
              isNavbarActive,
              setSearchFocus,
              setNavbarActive,
            }}
          >
            <div className="relative">
              <Navbar />
              <div
                id="main"
                className={`${isSearchFocused && isNavbarActive ? "" : ""}`}
              >
                <Outlet />
              </div>
              <Footer />
            </div>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: "",
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },

                // Default options for specific types
                success: {
                  duration: 3000,
                  theme: {
                    primary: "blue",
                    secondary: "black",
                  },
                },
              }}
            />
          </ThemeContext.Provider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Layout;
