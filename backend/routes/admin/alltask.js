const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema")
const CreateTaskSchema = mongoose.model("CreateTaskSchema")
const middlewaredefault = require("../middlewareSEC")
const admin_middleware = require("./adminmiddleware")

Router.get("/admin/alltask", middlewaredefault, admin_middleware,(req, res) =>
{
    CreateTaskSchema.find().populate("fromAssign", "_id username").populate("toAssignEMAIL", "username _id email").then((anydata)=>
    {
        if(anydata)
        {
            res.json(anydata)
        }
        else
        {
            res.json(
                {
                    error : "No data found !!"
                }
            )
            res.status(404)
        }
    })
})


module.exports = Router