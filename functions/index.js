const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LW6XfLHusP8fAmTyum3H4eHbENKPXIIVqwCExbTUfs2ud2eHndOFl0uXDRXgVdADmw9vWpRBBLIl6CoOn4fShLs00xGRSJ4hR"
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes

app.post("/payments/create", async (req, res) => {
  try {
    const total = req.query.total;

    console.log("Payment request received", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    // Good
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});
app.get("*", (req, res) => {
  res.status(404).send("404, Not Found");
});

// Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone1-95815/us-central1/api
