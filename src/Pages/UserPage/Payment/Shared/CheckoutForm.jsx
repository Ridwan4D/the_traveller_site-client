import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PropType from "prop-types";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";
const CheckoutForm = ({ book, pkg }) => {
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (pkg?.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: pkg?.price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, pkg?.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Create payment method without handling card validation errors
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Error:", error);
      setErrorMessage(error.message);
    } else {
      setErrorMessage(null);
      console.log("Payment method:", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmErr) {
      console.log(confirmErr);
      setErrorMessage();
    } else {
      //   console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          transactionId: paymentIntent.id,
          email: user?.email,
          price: pkg?.price,
          date: new Date(),
          bookingId: book?._id,
          pkgId: pkg?._id,
          status: "pending",
        };
        // console.log(paymentInfo);
        const res = await axiosSecure.post("/payments", paymentInfo);
        // console.log(res.data);
        if (res.data.paymentResult.insertedId) {
          toast.success("Payment successful");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Complete Your Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Element */}
          <div className="mb-4">
            <label
              htmlFor="card-element"
              className="block text-gray-700 text-lg mb-2"
            >
              Card Details
            </label>
            <div className="p-4 border rounded-md border-gray-300">
              <CardElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                  },
                }}
              />
            </div>
            {/* Display error message if there is any */}
            {errorMessage && (
              <div className="mt-2 text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!stripe || !clientSecret}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold text-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
CheckoutForm.propTypes = {
  pkg: PropType.object,
  book: PropType.object,
};
export default CheckoutForm;
