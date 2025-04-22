const express = require("express");
const app  = express();
const path = require("path")
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))

//db calling

const db = require("./config/dbConnection");

//calling routes
const authroutes = require("./routes/authRoutes");
const twittsroutes = require("./routes/twittsRoutes")

app.use("/auth",authroutes)
app.use("/twitts",twittsroutes)


app.listen(3000,()=>{
    console.log("server is running")
})