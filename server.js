const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const colors = require('colors');
const cors = require('cors');


// Load env vars
dotenv.config({ path: ".env" });

// Connect to database
connectDB();

const app = express();

// Middleware setup
app.use(express.json()); // Body parser
app.use(cors()); // CORS setup



// Mount routers
const auth = require("./routes/auth");


app.use("/api/v1/auth", auth);


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
