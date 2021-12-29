const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema")
const CreateTaskSchema = mongoose.model("CreateTaskSchema")
const middlewaredefault = require("../middlewareSEC")
const admin_middleware = require("./adminmiddleware")
const nodemailer  = require("nodemailer")
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
        subject: "TASK ASSIGNED",
        html: `<h1>Hii </h1><p>Hi user, <br> The Admin has been assigned the work [${taskname}] for you on ${fromTask}. <p>So please complete the work with in the ${toTask} Date. If your completed the work please update in your account. If any queries please let me know. Good Day !! <br><br><br><br>Thanks & regards<br>${process.env.DOMAIN}`
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



Router.post("/admin/createtask", middlewaredefault, admin_middleware, (req, res) => {
    var { taskname, fromTask, toTask, email } = req.body

    if (!taskname || !fromTask || !toTask || !email) {
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

        Userschema.findOne(
            {
                email: email
            }
        ).then(function (dd) {
            // console.log("JJJJJ")
            // console.log(dd)

            if (dd) {

                const insert = new CreateTaskSchema(
                    {
                        taskname: taskname,
                        fromTask,
                        toTask,
                        fromAssign: req.admin._id,
                        toAssignEMAIL: dd._id,
                        completed: "no"
                    }
                )

                Sendmail(email, taskname, fromTask, toTask)
                insert.save().then((suc) => {
                    if (suc) {
                        res.json(
                            {
                                success: "Successfully assigned !"
                            }
                        )
                    }
                })
            }
            else {
                res.json(
                    {
                        error: "The user not found"
                    }
                )
            }
        })


    }
})

module.exports = Router