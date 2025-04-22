const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const twitModel = require("../models/twitModel")
const jwt = require("jsonwebtoken")


module.exports.renderingLoginPage = (req,res)=>{
    res.render("login")
}

module.exports.renderinglogoutpage = (req,res)=>{
    res.clearCookie("token");
    console.log(req.cookies.token);
    res.render("login");
}


module.exports.renderingRegisterPage =(req,res)=> {
    res.render("register")
}


module.exports.renderingHomePage = async (req,res)=>{
  
    const User = await userModel.findById(req.user.id);
    const alluser = await userModel.find({ _id: { $ne: req.user.id } });
    const allTwitts = await twitModel.find({}).populate("createdBy");

    // console.log(allTwitts);
  
    res.render("home",{User,alluser,allTwitts});

}

module.exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
        
      let { username, password, email } = req.body;

      console.log(username);
      
      let user = await userModel.findOne({ email });
  
      if (user) {
        // user already exists
        return res.redirect("/auth/login");
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword
      });

      console.log(newUser);
      await newUser.save();


      console.log("✅ User registered:", newUser);
  
      res.redirect("/auth/login");
    } catch (err) {
      console.error("❌ Error in registerUser:", err);
      res.status(500).send("Internal Server Error");
    }
  };

module.exports.loginUser =  async (req,res)=>{

    console.log(req.body);
    let{email,password} = req.body
    console.log(email);

    let user = await userModel.findOne({"username":email});
    console.log(user);

    if(user){

        console.log("user is coming");

        bcrypt.compare(password,user.password, function(err,result) {
            
            if(result==true){

            const token = jwt.sign({id:user._id,email:user.email},"huihui");
        
            res.cookie("token",token);

            res.redirect("/auth/")

            }else{
                res.redirect("/auth/login");
            }
        });

    }else{

        res.redirect("/auth/register")

    }
}