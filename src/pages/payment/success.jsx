import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConfirmOrder } from "../../api/restapi";
import { ApiStatus } from "../../models/ApiResponse";

const Success = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data, status } = await ConfirmOrder({ payment_intent });
        if (status === 200 && data.status === ApiStatus.success) {
          setIsSuccess(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (payment_intent) {
      makeRequest();
    }
  }, []);

  return (
    <>
      {isSuccess && (
        <div className="my-24 flex flex-col items-center mx-auto max-w-screen-md p-4">
          <svg
            className="w-16 h-16 text-blue-500 mb-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="text-xl mb-5 text-center">
            Thank You! Payment successful. Click on view order to see order
            details
          </div>
          <div className="items-center flex flex-col">
            <button className="rounded-md bg-blue-500 text-white p-3 px-6">
              <Link to="/orders">View Orders</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Success;
