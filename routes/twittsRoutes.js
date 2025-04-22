const express = require("express");
const { renderingCreateTwiit , renderingPostTweet,follwingUser, likingController , dilikingcontroller, unfollowingUser} = require("../controllers/twittController");
const { isLoggedin } = require("../middlewares/isLoggedIn");
const { generateusigndeepseek } = require('../controllers/twittController');

const route = express.Router();

route.get("/ctweet",isLoggedin,renderingCreateTwiit);

route.post("/create-post",isLoggedin,renderingPostTweet);

route.get("/like/:id",isLoggedin,likingController);

route.post('/generate-deepseek',generateusigndeepseek);

route.post('/follow/:id',isLoggedin,follwingUser);

route.post('/unfollow:id',isLoggedin,unfollowingUser);

module.exports = route;

