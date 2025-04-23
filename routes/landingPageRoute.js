const express = require("express");
const { renderingHomePage } = require("../controllers/authControllers");
const { isLoggedin } = require("../middlewares/isLoggedIn");


const route = express.Router();

route.get("/",isLoggedin,renderingHomePage)



module.exports = route;