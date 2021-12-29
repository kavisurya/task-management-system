const mongoose = require("mongoose")


const Userschema = new mongoose.Schema(
    {
        username : {
            type :  String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        roleas : {
            type:String,
            required : true
        },
        password : {
            type:String,
            required : true
        },
        isEmailVerified : {
            type : String,
            default : "true"
        }
    }
)


exports.Userschema = mongoose.model("Userschema" , Userschema)