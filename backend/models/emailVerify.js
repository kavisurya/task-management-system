const express = require("express")
const mongoose = require("mongoose")


const EmailVerifyUserschema = new mongoose.Schema(
    {
        username : {
            type :  String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        roleas : {
            type:String,
            required : true
        },
        password : {
            type:String,
            required : true
        },
    }
)


exports.EmailVerifyUserschema = mongoose.model("EmailVerifyUserschema" , EmailVerifyUserschema)