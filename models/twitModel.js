const mongoose = require("mongoose");

const twitModel = mongoose.Schema({

    description:{
        type:String,
        require:true
    },
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

},{ timestamps: true })

module.exports = mongoose.model("Twitt",twitModel)