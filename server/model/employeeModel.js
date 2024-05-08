const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  salutation: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  qualifications: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  pin: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: false,
    default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
  },
  
} , {
  timestamps : true 
});

const Employeedata = mongoose.model("employeedata", schema);
module.exports = Employeedata;
