import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./database.js"; // Import database connection
import usersRoutes from "./routes/usersRoute.js";
import reviewRoutes from "./routes/reviewRoute.js"

import categoryRoutes from "./routes/product/categoryRoute.js";
import productRoutes from "./routes/product/productRoute.js"
import paymentRoutes from "./routes/payment.js";

import { auth } from "express-oauth2-jwt-bearer"; // Import JSON web token bearer library

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const checkJwt = auth({
  audience: 'https://collab-ecommerce-api.onrender.com',
  issuerBaseURL: 'https://dev-dwpgi30bfnfyjfbv.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});


app.get("/api/private", checkJwt, (req, res) => {
    res.json({
        message: "Private endpoint, must be authenticated"
    });
});
 
// Routes
app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/categories", categoryRoutes);
//app.use("/payment", paymentRoutes);

// Connect to MongoDB
connectToDatabase();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Server is running at https://collab-ecommerce-api.onrender.com as well!`);
}); 