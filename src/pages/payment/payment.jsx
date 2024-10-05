import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import { CreateOrder } from "../../api/restapi";
import { ApiStatus } from "../../models/ApiResponse";
import Loader from "../../components/loader/Loader";

const stripePromise = loadStripe("pk_test_w6fVjlXhvYYSF5DB5wZuBHPz007SGUcvfo");

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect if no gig ID is provided
  if (!id) {
    navigate("/");
  }

  useEffect(() => {
    const makePayment = async () => {
      try {
        const { data, status } = await CreateOrder({ gigId: id });
        if (status === 200 && data.status === ApiStatus.success) {
          setClientSecret(data.data.clientSecret); // Ensure this returns a valid client secret
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };
    makePayment();
  }, [id]); // Add id as a dependency

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Conditionally render Elements only if clientSecret is available
  return (
    <div className="max-w-screen-sm mx-auto py-12 px-8 md:py-16 md:px-16">
      <div>
        {clientSecret ? (
          <>
            <h3 className="mb-5 font-bold text-2xl">Enter Payment Details</h3>
            <div className="mb-5">
              Note: Use this Indian Card Number to make a successful
              transaction.
              <div className="font-bold mt-3">4000 0035 6000 0008</div>
            </div>
            <div className="rounded-lg shadow p-5">
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </>
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
