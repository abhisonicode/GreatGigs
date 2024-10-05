import React, { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../context/themeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.js";
import { BaseCategories, noAvatarUrl } from "../../data.js";
import SearchForm from "./SearchForm.jsx";

const isValidString = (url) => {
  return url.includes("://");
};

const Navbar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { setNavbarActive, isNavbarActive } = useContext(ThemeContext);
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null); // Create a ref for the menu

  const handleNavbar = () => {
    window.scrollY > 0 ? setNavbarActive(true) : setNavbarActive(false);
  };

  // Close menu if clicked outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsAccountMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbar);
    return () => {
      window.removeEventListener("scroll", handleNavbar);
    };
  }, []);

  // Add event listeners
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      <div
        className={`Navbar bg-white-500 sticky top-0 transition-all ease-in-out duration-300 z-[100] ${
          isNavbarActive || pathname !== "/"
            ? "shadow bg-white"
            : "text-white bg-slate-900"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-20 px-6">
            {/* Logo */}
            <Link to="/" className="flex items-end cursor-pointer">
              <div className="text-3xl font-bold">GreatGigs</div>
              <div className="h-[7px] w-[7px] bg-blue-500 logo-dot mb-2"></div>
            </Link>
            {/* Search Box */}
            <div className="hidden xl:block">
              {(isNavbarActive || pathname !== "/") && <SearchForm />}
            </div>
            {/* Links */}
            <div className="flex gap-x-5 items-center font-bold relative">
              {/* <span className="cursor-pointer"> Business Solutions </span>
              <span className="cursor-pointer">Explore</span>
              <span className="cursor-pointer">English</span> */}

              {/* {!loggedInUser?.isSeller && (
                <span className="cursor-pointer">Become a Seller</span>
              )} */}
              {!loggedInUser && (
                <Link className="hidden sm:block" to="/login">
                  <span className="cursor-pointer">Sign in</span>
                </Link>
              )}
              {!loggedInUser && (
                <button
                  onClick={() => navigate("/register")}
                  className={`hidden sm:block border rounded	 py-1 px-3 ${
                    isNavbarActive || pathname !== "/"
                      ? "border-blue-500 text-blue-500"
                      : "border-white text-white"
                  }`}
                >
                  Join
                </button>
              )}

              {/* When User is Logged in  */}
              {loggedInUser && (
                <div className="flex justify-center items-center gap-x-2 relative">
                  <img
                    src={
                      isValidString(loggedInUser.img)
                        ? loggedInUser.img
                        : noAvatarUrl
                    }
                    alt=""
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <span
                    className="hidden sm:block cursor-pointer py-1"
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  >
                    {loggedInUser?.username}
                  </span>
                </div>
              )}

              {/* Account Menu */}
              {isAccountMenuOpen && (
                <div
                  ref={menuRef}
                  onClick={() => setIsAccountMenuOpen(false)}
                  className="options top-[100%] right-[5%] flex flex-col bg-white font-normal text-base text-zinc-500 py-3 px-5 absolute border border-zinc-200	 rounded-lg w-[200px]"
                >
                  {loggedInUser && (
                    <>
                      {loggedInUser?.isSeller && (
                        <Link to="/my-gigs" className="cursor-pointer py-1">
                          My Gigs
                        </Link>
                      )}

                      <Link to="/orders" className="cursor-pointer py-1">
                        {loggedInUser?.isSeller ? "Manage Orders" : "My Orders"}
                      </Link>
                      <span
                        onClick={() => handleLogout()}
                        className="cursor-pointer py-1"
                      >
                        Logout
                      </span>
                    </>
                  )}

                  {!loggedInUser && (
                    <>
                      <Link to="/login" className="cursor-pointer py-1">
                        Sign In
                      </Link>
                      <Link to="/register" className="cursor-pointer py-1">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}

              {/* When Hamburger icon is there  */}
              {!loggedInUser && (
                <div
                  className="block sm:hidden cursor-pointer"
                  onClick={() => setIsAccountMenuOpen(true)}
                >
                  <svg
                    className={`w-6 h-6 ${
                      isNavbarActive || pathname !== "/"
                        ? "text-slate-800"
                        : "text-white"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M5 7h14M5 12h14M5 17h14"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="block lg:hidden w-full px-8 mb-4">
            {/* Mobile Search Box */}
            {(isNavbarActive || pathname !== "/") && <SearchForm />}
          </div>
        </div>

        {(isNavbarActive || pathname !== "/") && (
          <>
            <div className=" border-t"></div>
            <div className="container mx-auto py-3 hidden md:block">
              <ul className=" flex justify-center items-center gap-x-6 cursor-pointer text-base">
                {BaseCategories.slice(0, 4).map((category) => {
                  return <li key={category}> {category} </li>;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
