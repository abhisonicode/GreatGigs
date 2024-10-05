import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchText) {
      navigate("/gigs?search=" + searchText);
    }
  };

  return (
    <>
      <div id="hero" className="bg-slate-900">
        <div className="py-36 md:py-24 lg:py-0 container mx-auto lg:flex lg:flex-row items-center px-8 lg:px-16 max-h-[750px] lg:h-[100vh] -mt-16">
          {/* ---------------------------------
            Left Section
        --------------------------------- */}
          <div className="lg:basis-1/2 flex flex-col gap-y-7">
            <h1 className=" text-white font-bold text-5xl md:text-6xl">
              Find the right{" "}
              <span className="font-normal italic">freelance</span> service,
              right away
            </h1>
            <div>
              <label
                htmlFor="search-services"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-white-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  id="search-services"
                  className="block w-full p-3 lg:p-4 indent-5 ps-10 text-base text-gray-900 border focus:outline-none  rounded-lg bg-white placeholder-gray-400 "
                  placeholder="Search for any service..."
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute top-0 right-0 h-full p-2.5 px-4 sm:px-8 text-base font-medium text-white bg-[#3b82f6] hover:bg-[#2a67ca] focus:outline-none rounded-r-lg"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center text-white gap-y-2">
              <span className="mr-4 mb-4 sm:mb-0">Popular:</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                <li
                  onClick={(e) =>
                    navigate("/gigs?search=" + e.target.innerText)
                  }
                  className="font-bold p-1 px-4 text-sm border rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  Web Development
                </li>
                <li
                  onClick={(e) =>
                    navigate("/gigs?search=" + e.target.innerText)
                  }
                  className="font-bold p-1 px-4 text-sm border rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  Graphic Design
                </li>
                <li
                  onClick={(e) =>
                    navigate("/gigs?search=" + e.target.innerText)
                  }
                  className="font-bold p-1 px-4 text-sm border rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  Logo Design
                </li>
                <li
                  onClick={(e) =>
                    navigate("/gigs?search=" + e.target.innerText)
                  }
                  className="font-bold p-1 px-4 text-sm border rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
                >
                  Video Editing
                </li>
              </ul>
            </div>
          </div>

          {/* ---------------------------------
            Right Section
        --------------------------------- */}
          <div className="hidden lg:flex basis-1/2 flex-col gap-y-5 h-full justify-end ">
            <img
              className=" "
              src={
                "https://i.ibb.co/XY2ZwF1/Screenshot-39-removebg-preview.png"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
