import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./database.js"; // Import database connection
import usersRoutes from "./routes/usersRoute.js";
import reviewRoutes from "./routes/reviewRoute.js"

import categoryRoutes from "./routes/product/categoryRoute.js";
import productRoutes from "./routes/product/productRoute.js"

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
 
// Routes
app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/categories", categoryRoutes);

// Connect to MongoDB
connectToDatabase();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 