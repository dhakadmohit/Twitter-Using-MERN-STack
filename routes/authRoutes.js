const express = require("express");
const { renderingHomePage, renderingLoginPage, renderingRegisterPage,registerUser, loginUser ,renderinglogoutpage} = require("../controllers/authControllers");
const { isLoggedin } = require("../middlewares/isLoggedIn");

const route = express.Router();

route.get("/",isLoggedin,renderingHomePage)

route.get("/login",renderingLoginPage)

route.get("/register",renderingRegisterPage)

route.post("/register",registerUser)

route.post("/login",loginUser)

route.get('/logout',renderinglogoutpage)

route.post('/logout',renderinglogoutpage)


module.exports = route;