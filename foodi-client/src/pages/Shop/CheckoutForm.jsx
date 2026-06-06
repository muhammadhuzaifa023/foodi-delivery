import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or less than 1");

      return;
    }

    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setcardError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Payment Successfully Done",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      setcardError(
        <span className="text-black text-base">
          Your transactionId is{" "}
          <span className="text-blue-400">{paymentIntent.id}</span>
        </span>
      );

      // payment info data
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
        orderItems: cart.map((item) => ({
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          menuItemId: item.menuItemId
        }))
      };

      // console.log("Payment info", paymentInfo);
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        // alert("Payment Successfull!");
        navigate("/order");
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>

      {/* right side */}
      <div className="md:w-1/3 w-full space-y-5 card bg-base-100 max-w-sm shrink-0 shadow-2xl px-4 py-8">
        <h4 className="text-lg font-semibold">Process your Payment</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

        {/* stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-blue-700 w-full text-base text-white"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-red italic text-xs">{cardError}</p>
        ) : (
          ""
        )}

        <div className="text-center text-slate-300">
          <h2>OR</h2>
        </div>

        {/* paypal */}
        <div className="mt-5 text-center">
          <button
            type="submit"
            disabled={!stripe}
            className="btn py-0 bg-cyan-500 text-white text-base "
          >
            <FaPaypal className="text-blue-600 text-3xl" />
            Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
