import React, { useEffect, useMemo, useRef, useState } from "react";
import GigCard from "../../components/cards/GigCard";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGigs } from "../../api/restapi";
import Loader from "../../components/loader/Loader";
import { ApiStatus } from "../../models/ApiResponse";

const Gigs = () => {
  const { search } = useLocation();
  const minRef = useRef();
  const maxRef = useRef();
  const [sort, setSort] = useState("sales");
  const params = new URLSearchParams(search);
  const searchQuery = params.get("search");
  const category = params.get("cat");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`all-gigs`],
    queryFn: async () => {
      const res = await fetchGigs({
        search,
        min: minRef.current.value,
        max: maxRef.current.value,
        sort,
      });
      if (res?.data.status == ApiStatus.success) {
        return res.data.data;
      }
      return [];
    },
  });

  const applyFilters = () => {
    refetch();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="max-w-screen-2xl xl:mx-auto py-12 px-8 md:py-16 md:px-16">
      {/* BreadCrumb */}
      <div className="flex items-center gap-x-3 mb-4">
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg"
          alt=""
        />
        /<Link to={"/"}> Home</Link>
      </div>

      <h1 className="text-3xl font-bold mb-3">
        {searchQuery
          ? `Showing results for: ${searchQuery}`
          : category
          ? category
          : "Services"}
      </h1>
      <div className="text-gray-600 mb-4">
        Discover why we{"'"}re the top choice for professional services.
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-2 mb-8 gap-y-5">
        <div className="col-span-2 xl:col-span-1 flex flex-wrap items-center justify-start gap-x-5 gap-y-5 ">
          <span className="w-full sm:w-auto block font-normal text-base">
            Choose Budget
          </span>
          <input
            min={0}
            type="number"
            id="minBudget"
            className="w-32 md:w-44 block p-3 pl-4 md:pl-10 text-base text-gray-900 border focus:outline-none border-gray-200 rounded-lg bg-white placeholder-gray-400 "
            placeholder="min"
            ref={minRef}
          />
          <input
            min={0}
            type="number"
            id="maxBudget"
            className="w-32 md:w-44 block p-3 pl-4 md:pl-10 text-base text-gray-900 border focus:outline-none border-gray-200 rounded-lg bg-white placeholder-gray-400 "
            placeholder="max"
            ref={maxRef}
          />
          <button
            onClick={applyFilters}
            className="text-white bg-[#3b82f6] hover:bg-[#2a67ca] px-9 py-3 rounded-lg"
          >
            Apply
          </button>
        </div>
        <div className="col-span-2 xl:col-span-1 flex items-center xl:justify-end gap-x-4">
          <span>Sort by</span>
          <select
            onChange={(e) => {
              handleSortChange(e);
            }}
            id="gig-sorting"
            className="bg-gray-50 border text-sm rounded-lg block p-3 cursor-pointer text-gray-900 focus:outline-none border-gray-300 placeholder-gray-400 "
          >
            <option value="sales">Best Selling</option>
            <option value="createdAt">Newest</option>
          </select>
        </div>
      </div>

      {/* Gig Cards */}

      {isLoading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {error ? (
          <div className="col-span-4 text-center my-12">
            Something went wrong!
          </div>
        ) : data?.length === 0 ? (
          <div className="col-span-4 text-center my-12">No gigs found!</div>
        ) : (
          data?.map((gig) => {
            return <GigCard key={gig._id} gig={gig}></GigCard>;
          })
        )}
      </div>
    </div>
  );
};

export default Gigs;
