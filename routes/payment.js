import express from "express";
import dotenv from "dotenv";
//  jb- 6/4: commenting this out until we get .env info as it's currently crashing our Render hosting

dotenv.config();

import Stripe from "stripe";

// import express from "express";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// const router = express.Router();

let stripe;


if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10",
  });
} else {
  console.warn("⚠️ STRIPE_SECRET_KEY not set, using mock Stripe");
  stripe = {
    paymentIntents: {
      create: async ({ amount, currency }) => {
        console.log(`Mock create payment intent called with amount: ${amount} ${currency}`);
        return { client_secret: "mock_client_secret_123" };
      },
    },
  };
}

// Create payment intent route (same as before)
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Create payment intent

// router.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//     });
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// export default router;
