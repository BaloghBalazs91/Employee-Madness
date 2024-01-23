const mongoose = require('mongoose');

const { Schema } = mongoose;

const DivisionsSchema = new Schema({
    name: String,
    boss: String,
    budget: Number,
    location: {
        city: String,
        country: String
    }
})

module.exports = mongoose.model('Divisions', DivisionsSchema);