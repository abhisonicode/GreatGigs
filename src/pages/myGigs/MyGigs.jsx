import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiStatus } from "../../models/ApiResponse";
import { DeleteGig, GetMyGigs } from "../../api/restapi";
import { UserContext } from "../../context/userContext";
import Loader from "../../components/loader/Loader";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";
import { formattedDate } from "../../utils/helper";

const MyGigs = () => {
  const { loggedInUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["my-gigs"],
    queryFn: async () => {
      const { data, status } = await GetMyGigs({ userId: loggedInUser._id });
      if (status == 200 && data.status === ApiStatus.success) {
        return data.data;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await DeleteGig({ id });
    },
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.status === ApiStatus.success) {
        showSuccessAlert(data.message);
        queryClient.invalidateQueries(["my-gigs"]);
      }
    },
    onError: (error) => {
      const { response } = error;
      const { data } = response;
      showErrorAlert(data.message);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-8 md:py-16 md:px-16">
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl">My Gigs</h1>
        <Link to="/add">
          <button className="bg-blue-500 p-2 px-4 text-white rounded-md">
            Add new Gig
          </button>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        "Something went wrong!"
      ) : data.length === 0 ? (
        "No data"
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <th scope="col" className="px-6 py-3">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="bg-white border-b even:bg-gray-100 font-bold"
                  >
                    No Data
                  </td>
                </tr>
              ) : (
                data.map((gig) => {
                  return (
                    <tr
                      key={gig._id}
                      className="bg-white border-b even:bg-gray-100 font-bold"
                    >
                      <td className="px-6 py-4">
                        {formattedDate(gig.createdAt)}
                      </td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        <Link to={"/gig/" + gig._id}>
                          <img
                            className="max-w-[100px] h-auto rounded"
                            src={gig.cover}
                            alt=""
                          />
                        </Link>
                      </th>
                      <td className="px-6 py-4">{gig.title}</td>
                      <td className="px-6 py-4">₹{gig.price}</td>
                      <td className="px-6 py-4">{gig.sales}</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-6 h-6 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          id="Capa_1"
                          onClick={() => handleDelete(gig._id)}
                          fill="#ff0000"
                          viewBox="0 0 482.428 482.429"
                        >
                          <g>
                            <g>
                              <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979    V115.744z" />
                              <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z" />
                              <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z" />
                              <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z" />
                            </g>
                          </g>
                        </svg>
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

export default MyGigs;
