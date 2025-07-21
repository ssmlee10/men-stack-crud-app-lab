const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female'] },
    isAdopted: Boolean
});

// create model
const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;