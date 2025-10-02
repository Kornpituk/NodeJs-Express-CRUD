import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRouters.js";
import errorHandling from "./middlewares/errorHandle.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandling);

export default app;
