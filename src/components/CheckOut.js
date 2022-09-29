import React from "react";
import Subtotal from "./Subtotal";
import "../styles/CheckOut.css";
import { useStateValue } from "../StateProvider";
import CheckOutProduct from "./CheckOutProduct";
import Header from "./Header";
function CheckOut() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <>
      <Header />
      <div className="checkout">
        <div className="checkout__left">
          <img
            className="checkout__ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
          <div>
            <h3> Hello, {user?.email} </h3>
            <h2 className="checkout__title">Your Shopping cart</h2>
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
        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </>
  );
}

export default CheckOut;
