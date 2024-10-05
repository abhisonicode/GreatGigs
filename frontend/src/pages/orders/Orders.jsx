import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { GetOrders, MarkOrderAsCompleted } from "../../api/restapi";
import { ApiStatus } from "../../models/ApiResponse";
import Loader from "../../components/loader/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";
import { Link } from "react-router-dom";
import { formattedDate } from "../../utils/helper";

const Orders = () => {
  const { loggedInUser } = useContext(UserContext);

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, status } = await GetOrders();
      if (status === 200 && data.status === ApiStatus.success) {
        return data.data;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await MarkOrderAsCompleted({ id });
    },
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.status === ApiStatus.success) {
        showSuccessAlert(data.message);
        queryClient.invalidateQueries(["orders"]);
      }
    },
    onError: (error) => {
      const { response } = error;
      const { data } = response;
      showErrorAlert(data.message);
    },
  });

  const handleComplete = (orderId) => {
    mutation.mutate(orderId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16">
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl">Orders</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs py-3 text-white uppercase bg-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Created On
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  {loggedInUser?.isSeller ? "Buyer" : "Seller"}
                </th> */}
                <th scope="col" className="px-6 py-3">
                  {/* Contact */}
                  {loggedInUser?.isSeller ? "Action" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="bg-white border-b even:bg-gray-100 font-bold h-12 p-3 text-center"
                  >
                    No Data
                  </td>
                </tr>
              ) : (
                data.map((order) => {
                  return (
                    <tr
                      key={order._id}
                      className="bg-white border-b even:bg-gray-100 font-bold"
                    >
                      <td className="px-6 py-4">
                        {formattedDate(order.createdAt)}
                      </td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        <Link to={"/gig/" + order.gigId}>
                          <img
                            className="max-w-[100px] h-auto rounded cursor-pointer"
                            src={order.img}
                            alt=""
                          />
                        </Link>
                      </th>

                      <td className="px-6 py-4">{order.title}</td>
                      <td className="px-6 py-4">₹{order.price}</td>
                      {/* <td className="px-6 py-4">
                        {loggedInUser?.isSeller
                          ? order.buyerId
                          : order.sellerId}
                      </td> */}
                      <td className="px-6 py-4">
                        {/* <Link to="/messages">
                          <svg
                            className="w-9 h-9 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              stroke="#0195e4"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 9H17M10 13H17M7 9H7.01M7 13H7.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                            />
                          </svg>
                        </Link> */}

                        {order.isFinished ? (
                          <span
                            className={`p-3 md:px-5 rounded-lg ${
                              loggedInUser?.isSeller
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }  text-white`}
                          >
                            {loggedInUser?.isSeller ? "Delivered" : "Completed"}
                          </span>
                        ) : loggedInUser?.isSeller ? (
                          <button
                            className="text-white p-2 px-3 bg-blue-500 rounded-md"
                            onClick={() => {
                              handleComplete(order._id);
                            }}
                          >
                            Mark as Complete
                          </button>
                        ) : (
                          <span className="p-3 md:px-5 rounded-lg bg-amber-500 text-white">
                            Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
