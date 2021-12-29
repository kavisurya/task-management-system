const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema")
const CreateTaskSchema = mongoose.model("CreateTaskSchema")
const middlewaredefault = require("../middlewareSEC")


Router.get("/user", middlewaredefault, (req,res)=>
{
    CreateTaskSchema.find(
        {
            toAssignEMAIL : req.user._id
        }
    ).populate("fromAssign", "username").populate("toAssignEMAIL", "username _id email")
    .then((data)=>
    {
        if(data)
        {
            for(i=0; i < data.length; i++)
            {
                data[i].fromAssign["_id"] = null
            }
            res.send(data)
        }
        else
        {
            res.send(
                {
                    error : "No data found !!"
                }
            )
            res.status(404)
        }
    })
})


Router.post("/user", middlewaredefault, (req,res)=>
{
    var {id, completed} = req.body

    if(!id || !completed)
    {
        res.json(
            {
                error: "please fill all fields"
            }
        )
        res.status(421)
    }
    else
    {
        CreateTaskSchema.findOne(
            {
                _id : id
            }
        ).then((val)=>
        {
            if(val)
            {
                CreateTaskSchema.updateOne(
                    {
                        _id : id
                    },
                    {
                        _id : val._id,
                        taskname : val.taskname,
                        fromTask : val.fromTask,
                        toTask : val.toTask,
                        fromAssign : val.fromAssign,
                        toAssignEMAIL : val.toAssignEMAIL,
                        completed : completed
                    }
                ).then((su)=>
                {
                    if(su)
                    {
                        res.json(
                            {
                                success: "Successfully updated !"
                            }
                        )
                        res.status(200)
                    }
                    else
                    {
                        res.json(
                            {
                                error: "not updated !"
                            }
                        )
                        res.status(404)
                    }
                })
            }
            else
            {
                res.json(
                    {
                        error: "the task not found !"
                    }
                )
                res.status(404)
            }
        }).catch((err)=>
        {
            res.json(
                {
                    error: "The Task not found"
                }
            )
            res.status(404)
            console.log(err)
        })
    }
})

module.exports =Router