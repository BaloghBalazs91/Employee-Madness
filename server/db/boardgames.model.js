const mongoose = require('mongoose');

const { Schema } = mongoose;

const BoardGamesSchema = new Schema({
    name: String,
    maxPlayers: Number
})

module.exports = mongoose.model('Boardgames', BoardGamesSchema);