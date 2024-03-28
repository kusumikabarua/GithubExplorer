const mongoose = require("mongoose");

const friendsSchema = mongoose.Schema(
   {
        username:{
            type:String,
            required:true,
            unique:true
        },
        id:{
            type:Number,
            required:true
        },
        friends:{
            type:String
        },
        isDeleted:{
            type:Boolean,
           default:false
        },
        
    }

)

const Friend = mongoose.model("Friend",friendsSchema);
module.exports= Friend;