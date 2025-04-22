const userModel = require("../models/userModel");
const twitModel = require("../models/twitModel")

const jwt = require("jsonwebtoken")

module.exports.renderingCreateTwiit = (req,res)=>{
    res.render("createtwitt");
}

module.exports.renderingPostTweet = async (req,res)=>{
    
    const user = await userModel.findById(req.user.id);

    let {content}=req.body

    const twitt = await twitModel.create({
        
        description:content,
        createdBy:user._id
    }) 

    twitt.save();

   res.redirect("/auth")
}

module.exports.likingController = async(req,res)=>{

    try{
    let userId = req.user.id;

    let twitId = req.params.id;

    let twit = await  twitModel.findOne({_id:twitId});
    
    let uI = twit.likes.find((Id)=>Id==userId)

    if(!uI) twit.likes.push(userId);

    await twit.save();
    
    res.redirect("/auth")

    }catch(e){
        console.log(e.message)
    }
}

module.exports.follwingUser = async(req,res)=>{
  const id = req.params.id;
  const loggedUsr = await userModel.findOne({_id:req.user.id});
  const clickeduser = await userModel.findOne({_id:id});

  if(await loggedUsr.following.includes(id)){
    res.redirect('/auth/');
    return res.redirect('/auth/');
  }
  else{
    await clickeduser.friends.push(loggedUsr._id);
    await loggedUsr.following.push(id);
    loggedUsr.save();
    clickeduser.save();
  }
  res.redirect('/auth/');
}

module.exports.unfollowingUser = async(req, res) => {

  const id = req.params.id;  // Get the ID of the user to unfollow from the URL
  const loggedUsr = await userModel.findOne({ _id: req.user.id }); // Get the currently logged-in user
  const clickedUser = await userModel.findOne({ _id: id });  // Get the user being unfollowed

  // Check if the logged-in user is already following the clicked user
  if (loggedUsr.following.includes(id)) {
    // Remove the clicked user from the following list of the logged-in user
    loggedUsr.following = loggedUsr.following.filter(userId => userId.toString() !== id);

    // Remove the logged-in user from the friends list of the clicked user
    clickedUser.friends = clickedUser.friends.filter(userId => userId.toString() !== loggedUsr._id.toString());

    // Save the updated user data to the database
    await loggedUsr.save();
    await clickedUser.save();
    // Send a success response
    res.redirect('/auth/');
  }
}