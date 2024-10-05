import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loader from "../loader/Loader";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts";
import { LoaderIcon } from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Ensure both are available
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success", // Ensure correct return URL
      },
    });

    if (error) {
      setMessage(error.message);
      showErrorAlert(error.message);
    } else {
      showSuccessAlert("Payment successful!");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="mt-5 p-2 px-3 rounded-lg text-white bg-blue-500"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <LoaderIcon /> <span>Processing</span>
              </div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </form>
      {isLoading && <Loader />}{" "}
    </div>
  );
};

export default CheckoutForm;
