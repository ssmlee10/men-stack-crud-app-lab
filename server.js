const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// connect to MongoDB dogs
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// Import the Dog model
const Dog = require("./models/dog.js");

// adding middleware for app
app.use(express.urlencoded({ extended: false }));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /dogs/new
app.get("/dogs/new", async (req, res) => {
  res.render("dogs/new.ejs");
});

// POST /dogs
app.post("/dogs", async (req, res) => {
  console.log(req.body);
  if (req.body.isAdopted === "on") {
    req.body.isAdopted = true;
  } else {
    req.body.isAdopted = false;
  }
  await Dog.create(req.body);
  res.redirect("/dogs/new");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
