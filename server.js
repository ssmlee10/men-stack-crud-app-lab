const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const morgan = require('morgan');

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
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /dogs
app.get('/dogs', async (req, res) => {
    const allDogs = await Dog.find();
    // check if we have all dogs in the terminal
    // console.log(allDogs);
    res.render('dogs/index.ejs', { dogs: allDogs });
});

// GET /dogs/new
app.get("/dogs/new", async (req, res) => {
  res.render("dogs/new.ejs");
});

// GET /dogs/:dogId
app.get('/dogs/:dogId', async (req, res) => {
    const foundDog = await Dog.findById(req.params.dogId);
    res.render('dogs/show.ejs', {dog: foundDog });
})

// POST /dogs
app.post("/dogs", async (req, res) => {
  console.log(req.body);
  if (req.body.isPottyTrained === "on") {
    req.body.isPottyTrained = true;
  } else {
    req.body.isPottyTrained = false;
  }

  await Dog.create(req.body);
  res.redirect("/dogs");
});

// DELETE route
app.delete('/dogs/:dogId', async (req, res) => {
    // res.send('this is the delete route');
    await Dog.findByIdAndDelete(req.params.dogId);
    res.redirect('/dogs');
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
