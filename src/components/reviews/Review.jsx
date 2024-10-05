import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetUserById } from "../../api/restapi";
import { ApiStatus } from "../../models/ApiResponse";
import Loader from "../loader/Loader";
import { noAvatarUrl } from "../../data";

const Review = ({ review }) => {
  const {
    isLoading,
    error,
    data: userData,
  } = useQuery({
    queryKey: [review.userId],
    queryFn: async () => {
      const { data, status } = await GetUserById({ userId: review.userId });
      if (status == 200 && data.status === ApiStatus.success) {
        return data.data;
      } else {
        return null;
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        "Failed to load review"
      ) : (
        <div className="flex flex-col gap-y-2 border-b pb-6 border-zinc-200">
          <div className="flex justify-start items-center gap-x-5 bg-white">
            <img
              src={userData.img || noAvatarUrl}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="font-bold">
              {userData.username}
              <div className="font-normal text-sm">{userData.country}</div>
            </div>
          </div>
          <div className="font-bold mb-2">
            {Array(review.star)
              .fill()
              .map((item, i) => (
                <React.Fragment key={i}>⭐</React.Fragment>
              ))}
            <span className="ml-2">{review.star}</span>
          </div>
          <div className="text-zinc-800 mb-2">{review.desc}</div>
          <div className="flex font-bold items-center gap-x-4">
            <span className="">Helpful?</span>
            <div className="cursor-pointer">👍 Yes</div>
            <div className="cursor-pointer">👎 No</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
