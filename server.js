const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// connect to MongoDB dogs
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// Import the Dog model
const Dog = require("./models/dog.js");

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// GET /dogs/new
app.get("/dogs/new", (req, res) => {
    res.render('dogs/new.ejs');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});