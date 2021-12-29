const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema")
const CreateTaskSchema = mongoose.model("CreateTaskSchema")
const middlewaredefault = require("../middlewareSEC")
const admin_middleware = require("./adminmiddleware")
const nodemailer = require("nodemailer")
require("dotenv").config()

function Sendmail(email, taskname, fromTask, toTask) {
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.EMAILCREDNAME,
                pass: process.env.EMAILCREDPASS
            }
        }
    )

    var mailoperations = {
        from: process.env.EMAILCREDNAME,
        to: email,
        subject: "TASK UPDATED",
        html: `<h1>Hii </h1><br><p>Hi user, <br> The Admin has been updated assigned the work [${taskname}] for you on ${fromTask}. <p>So please complete the work with in the ${toTask} Date. If your completed the work please update in your account. If any queries please let me know. Good Day !! <br><br><br><br>Thanks & regards<br>${process.env.DOMAIN}`
    }

    transporter.sendMail(mailoperations, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    })
}


Router.post("/admin/edit", middlewaredefault, admin_middleware, (req, res) => {
    var { id, taskname, fromTask, toTask, email, completed } = req.body

    if (!id || !taskname || !fromTask || !toTask || !email || !completed) {
        res.json(
            {
                error: "please fill all fields"
            }
        )
        res.status(421)
    }
    else if (email.length < 6 || taskname.length < 5) {
        res.json(
            {
                error: "The email should be 6 characters and taskname should be 5 characters"
            }
        )
        res.status(421)
    }
    else {
        CreateTaskSchema.findOne(
            {
                _id: id
            }
        ).then((theval) => {
            if (theval) {
                Userschema.findOne(
                    {
                        email: email
                    }
                ).then(function (dd) {
                    if (dd) {
                        CreateTaskSchema.updateOne(
                            {
                                _id: id
                            },
                            {
                                _id: theval._id,
                                taskname: taskname,
                                fromTask: fromTask,
                                toTask: toTask,
                                toAssignEMAIL: dd._id,
                                fromAssign: req.admin._id,
                                completed: completed
                            }
                        ).then((ok) => {
                            if (ok) {
                                Sendmail(email, taskname, fromTask, toTask)

                                res.json(
                                    {
                                        success: "Successfully task updated !"
                                    })
                            }
                            else {
                                res.json(
                                    {
                                        error: "Task not updated !"
                                    })
                                res.status(421)
                            }
                        })
                    }
                    else {
                        res.json(
                            {
                                error: "The User Not found"
                            })
                        res.status(404)
                    }
                })


            }
            else {
                res.json(
                    {
                        error: "The Task not found"
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

module.exports = Router