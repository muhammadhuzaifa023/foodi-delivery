const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 6001;
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

// mongodb config
mongoose
  .connect(process.env.DB_URL)
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// jwt authentication
app.post("/api/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// imports routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
app.use("/api/menu", menuRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// stripe payment routes
app.post("/api/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// ... baqi saara code wahi rahega ...

// Is line ko end mein add karein
module.exports = app;

// Isko condition mein rakh dein taake Vercel pe masla na ho
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
}
