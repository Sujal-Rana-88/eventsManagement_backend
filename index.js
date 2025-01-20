const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require("./routes/UserRoutes");
const EventsRoutes = require("./routes/EventsRoutes");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const app = express();  

// Rate limiter middleware 
const limiter = rateLimit({
  windowMs:  1000, // 1 sec
  max: 100,   // 100 req -> per sec
  standardHeaders: true, 
  legacyHeaders: false, 
  message: "Too many requests from this IP, please try again later.",
});

// Apply rate limiter to all requests
app.use(limiter);
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// API route to create a new user
app.use("/", UserRoutes);
app.use("/", EventsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
