const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
        avatarUrl:{
            type:String,
            required:true
        }, 
        type:{
            type:String,
            required:true,    
        },
        name:{
            type:String,
        },
        company:{
            type:String,
        },
        blog:{
            type:String,
        },
        location:{
            type:String,
        },
        email:{
            type:String,           
        },
        bio:{
            type:String,         
        },
        numberOfPublicRepos:{
            type:Number,
            required:true
        },
        followers:{
            type:Number,
            required:true
        },
        following:{
            type:Number,
            required:true
        },
        createdAt:{
            type:Date,
            required:true
        },
        updatedAt:{
            type:Date,
            required:true
        },
        
    }

)

const User = mongoose.model("User",userSchema);
module.exports= User;