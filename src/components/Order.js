import React from "react";
import "../styles/Order.css";
import moment from "moment";
import CheckOutProduct from "./CheckOutProduct";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer";

function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="order">
      <h2>Order</h2>
      <p> {moment.unix(order.data.created).format("MM/DD/YYYY, HH:mm:ss")} </p>
      <p className="order__id">
        <small>{order.id} </small>
      </p>
      <div>
        {order.data.basket?.map((item) => (
          <CheckOutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton={item.hideButton}
          />
        ))}
        <CurrencyFormat
          renderText={(value) => (
            <>
              <h3 className="order__total">Order Details: {value} </h3>
            </>
          )}
          decimalScale={2}
          value={order.data.amount / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
    </div>
  );
}

export default Order;
