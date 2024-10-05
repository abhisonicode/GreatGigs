import React, { useRef, useState } from "react";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateReview, GetReviewsByGigId } from "../../api/restapi";
import { ApiStatus } from "../../models/ApiResponse";
import Loader from "../loader/Loader";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";

const Reviews = ({ gigId }) => {
  const [newReview, setNewReview] = useState("");
  const ratingRef = useRef();

  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: [gigId],
    queryFn: async () => {
      const { data, status } = await GetReviewsByGigId({ gigId });
      if (status == 200 && data.status === ApiStatus.success) {
        return data.data;
      } else {
        return null;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (review) => {
      return await CreateReview(review);
    },
    onSuccess: ({ data, status }) => {
      if (status === 201 && data.status === ApiStatus.success) {
        showSuccessAlert(data.message);
        setNewReview("");
      }
      queryClient.invalidateQueries([gigId]);
    },
    onError: (error) => {
      const { response } = error;
      const { data } = response;
      showErrorAlert(data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview) {
      showErrorAlert("Enter something!");
      return;
    }

    mutation.mutate({
      gigId,
      desc: newReview,
      star: ratingRef.current.value,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        "Failed to load reviews"
      ) : (
        <div className="mb-6">
          <h3 className="font-bold text-2xl mb-6">Reviews</h3>
          <div className="flex flex-col gap-y-7">
            {data.length === 0 ? (
              <span>No reviews found!</span>
            ) : (
              data.map((review) => <Review key={review._id} review={review} />)
            )}
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-2xl mb-6">Add a Review</h3>
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-3 text-base font-semibold">Write a Review</div>
              <input
                type="text"
                placeholder="I liked the services..."
                value={newReview}
                className="mb-4 border p-2 px-4 ps-3 w-full focus:outline-none"
                onChange={(e) => setNewReview(e.target.value)}
              />
              <div className="mb-3 text-base font-semibold">
                Choose Rating {"(out of 5)"}
              </div>
              <div className="flex sm:flex-row justify-start gap-x-3 items-center">
                <select
                  ref={ratingRef}
                  name="review-start"
                  className="border p-3 min-w-[100px] focus-within:outline-none cursor-pointer"
                >
                  {Array(5)
                    .fill("")
                    .map((_, index) => {
                      return (
                        <option key={5 - index} value={5 - index}>
                          {5 - index}
                        </option>
                      );
                    })}
                </select>
                <button className="rounded-md bg-blue-500 text-white p-3 px-6">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
