import { useState, useEffect } from "react";
import "../styles/Payment.css";
import { useStateValue } from "../StateProvider";
import CheckOutProduct from "./CheckOutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";
import axios from "axios";
import { db } from "../firebase";

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  // two hooks for payment stripe
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total= ${getBasketTotal(basket) * 100} `,
      });
      //this updates the stripe if the basket changes
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is >>>", clientSecret);

  const handleSubmit = async (e) => {
    //do all the fancy stripe stuff...
    e.preventDefault();
    setProcessing(true);

    const payLoad = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent=payment confirmation
        // store in firestore database
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.uid)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: "EMPTY_BASKET" });

        navigate("/orders");
      });
  };
  const handleChange = (e) => {
    //listen to the changes in the card Element
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout {<Link to="/checkout"> {basket.length} item(s) </Link>}
        </h1>
        {/* {payment section}- delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p> {user?.email} </p>
            <p>123 react lane</p>
            <p>Kampala Ggaba</p>
          </div>
        </div>
        {/* {payment section}- review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, id) => (
              <CheckOutProduct
                key={id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* {payment section}- payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Details: {value} </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span> {processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>
              {/* error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
