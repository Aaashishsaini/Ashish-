const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

dotenv.config();

// Database connection
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    //   console.log(`${conn.connection.host}`);
    //   console.log(`${conn}`)
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDb();

const app = express();

// middlewear
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use(express.static(path.join(__dirname, "./client/build")));

// rest api
// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome to e-commerce-app",
//   });
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
