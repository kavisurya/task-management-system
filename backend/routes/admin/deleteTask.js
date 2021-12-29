const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema")
const CreateTaskSchema = mongoose.model("CreateTaskSchema")
const middlewaredefault = require("../middlewareSEC")
const admin_middleware = require("./adminmiddleware")
const nodemailer = require("nodemailer")
require("dotenv").config()


function Sendmail(email, taskname) {
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
        subject: "TASK DELETED",
        html: `<h1>Hii </h1><p>Hi user, <br> The Admin has been deleted the assigned work [${taskname}] Good Day !! <br><br><br><br>Thanks & regards<br>${process.env.DOMAIN}`
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

Router.post("/admin/delete", middlewaredefault, admin_middleware, (req, res) => {
    var { id } = req.body

    if (!id) {
        res.json(
            {
                error: "please fill all fields"
            }
        )
        res.status(421)
    }
    else {
        CreateTaskSchema.findOne(
            {
                _id: id
            }
        ).then((ff) => {
            if (ff) {
                Userschema.findOne(
                    {
                        _id : ff.toAssignEMAIL
                    }
                ).then((done)=>
                {
                    if(done)
                    {
                        Sendmail(done.email,ff.taskname)


                        CreateTaskSchema.deleteOne(
                            {
                                _id: id
                            }
                        ).then((del) => {
                            if (del) {
                                res.json(
                                    {
                                        success: "The task deleted !!"
                                    }
                                )
                                res.status(200)
                            }
                            else{
                                res.json(
                                    {
                                        error: "The task is not deleted !!"
                                    }
                                )
                                res.status(421)
                            }
                        })
                    }
                    else{
                        res.json(
                            {
                                error: "The user not found"
                            })
                        res.status(404)
                    }
                })


                
                
            }
            else {
                res.json(
                    {
                        error: "The Task Not found"
                    })
                res.status(404)
            }
        })

    }
})
module.exports = Router