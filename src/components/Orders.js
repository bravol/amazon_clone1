import { useEffect, useState } from "react";
import "../styles/Orders.css";
import Header from "./Header";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import Order from "./Order";
import { collection } from "firebase/firestore";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.usd)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <>
      <div>
        <Header />
        <h1>Your Orders</h1>
        <div>
          {orders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
