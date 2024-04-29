import React, { useEffect, useState } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkOutForm/CheckOutForm";
const stripePromise = await loadStripe("pk_test_51PAVKeSEO7RA2HdjELPB2hZgWZvMQYC0E3ReAwR9mbQVE7AN9ReXIUJUXlMyg8hxG8LpkaxxkPXRJtBPPp1TK8Yg00RYPplenh");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  },[id]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;