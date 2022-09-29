import "./App.css";
import Home from "./components/Home";
import CheckOut from "./components/CheckOut";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
//payments with stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51LW6XfLHusP8fAmTKJd4DETnVO7F0zPGolPcck2sBp6KFDf9L6DD9thcu17ZJM8gW2mKOKyHu0cBmbKgyoZO3x4e00bQE7eRn9"
);

function App() {
  //this is a data layer component connected with firebase
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //only runs once when the app component loads..
    auth.onAuthStateChanged((authUser) => {
      console.log("The User is >>>", authUser);

      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
