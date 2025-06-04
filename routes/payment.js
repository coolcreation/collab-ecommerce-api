//  jb- 6/4: commenting this out until we get .env info as it's currently crashing our Render hosting


// import express from "express";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// const router = express.Router();


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
