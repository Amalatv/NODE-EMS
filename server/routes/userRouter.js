const express = require('express');
const route = express.Router();
const usercontroller = require('../services/userServices');
const {logout} = require('../controller/userController')


route.get("/current",usercontroller.currentUser);
route.post("/",usercontroller.signup);
route.post("/loginUser",usercontroller.loginUser);
route.post("/verifyUserEmail",usercontroller.verifyUserEmail);
route.post("/logout",logout);


module.exports = route;
