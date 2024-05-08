const express = require('express');
const route = express.Router();
const { homeRoutes, signupRoutes, otpRoutes,viewRoutes } = require('../services/render');
const isAuthenticated = require('../controller/authentication');


// Routes requiring authentication
route.get("/home", isAuthenticated, homeRoutes);
route.get("/employeedetails",isAuthenticated,viewRoutes)
route.get("/signup", signupRoutes);
route.get("/", signupRoutes);
route.get("/otp", otpRoutes);

module.exports = route;