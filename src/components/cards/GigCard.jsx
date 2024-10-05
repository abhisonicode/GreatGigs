import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GetUserById } from "../../api/restapi";
import { ApiStatus } from "../../models/ApiResponse";
import { noAvatarUrl } from "../../data";

const GigCard = ({ gig }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`gigUser-${gig.userId}`],
    queryFn: async () => {
      const res = await GetUserById({ userId: gig.userId });
      if (res?.data.status == ApiStatus.success) {
        return res.data.data;
      }
    },
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <div className="overflow-hidden border rounded-lg cursor-pointer shadow-lg flex flex-col justify-between">
        <Link to={"/gig/" + gig._id}>
          <img
            src={gig.cover}
            className="object-cover mr-0 w-full h-[180px]"
            alt={gig.cat}
          />
        </Link>
        <div className="flex flex-col gap-y-2 py-3 px-3 text-gray-700 bg-white">
          <div className="flex justify-start items-center gap-x-3 ">
            <img
              src={data?.img || noAvatarUrl}
              alt=""
              className="w-6 h-6 rounded-full object-cover"
            />
            <div className="font-bold">{data?.username || "n/a"}</div>
          </div>
          <span className="font-bold">{gig.title}</span>
          <span className="text-sm">{gig.shortDesc}</span>
          <div className="font-bold">
            ⭐
            <span className="text-gray-600 font-normal">
              {"("}
              {!isNaN(gig.totalStars / gig.starNumber)
                ? Math.round(gig.totalStars / gig.starNumber)
                : 0.0}
              {")"}
            </span>
          </div>
          <span className="font-bold text-base">From ₹{gig.price}</span>
        </div>
      </div>
    </>
  );
};

export default GigCard;
