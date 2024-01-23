const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: Boolean,
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: 'FavoriteBrand'
  },
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  starting_day: String,
  salary: {
    actual_salary: String,
    desired_salary: String,
    salary_difference: String
  },
  favorite_color: String,
  division: String,
  boss: String,
  prevcompany: String,
  pets: [
    {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
    }
  ],
  kittens: [
    {
      name: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      employee: {
        type: String,
        required: true
      },
    }
  ],
  boardGame: String
});

module.exports = mongoose.model("Employee", EmployeeSchema);
