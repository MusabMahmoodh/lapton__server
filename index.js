import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env" });
}

import express from "express";
import cors from "cors";

import morgan from "morgan";
import helmet from "helmet";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

import labRoutes from "./routes/labRoutes.js";

// Cloudinary config
import pkg from "cloudinary";

const { v2: cloudinary } = pkg;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//
dotenv.config();

connectDB();
// import seeder from "./seeder.js";
// seeder();

const app = express();
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json({ limit: "5mb" }));

app.use(morgan("dev"));

app.use("/api/resources", productRoutes); //for resources
app.use("/api/users", userRoutes);
app.use("/api/labs", labRoutes);

app.use("/api/categories", categoryRoutes); //for main categories
app.use("/api/subjects", subjectRoutes); //for subjects

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
