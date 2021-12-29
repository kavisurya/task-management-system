const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const EmailVerifyUserschema = mongoose.model("EmailVerifyUserschema")
const Userschema = mongoose.model("Userschema")
const md5 = require("md5")
const nodemailer = require("nodemailer")
require("dotenv").config()


Router.get("/confirmation/:uuid&&:hash", (req, res) => {
    var { uuid, hash } = req.params

    EmailVerifyUserschema.findOne(
        {
            _id: uuid
        }
    ).then((data) => {
        if (data) {

            if (md5(data.password) == hash) {


                const insert = new Userschema(
                    {
                        username: data.username,
                        email: data.email,
                        roleas: data.roleas,
                        password: data.password,
                    }
                )

                insert.save().then((dt) => {
                    if (dt) {
                        res.json
                            ({
                                success: "Email verified successfully"
                            })
                        res.status(200)
                    }
                }).catch((error) => {
                    console.log(error)
                    res.json
                        ({
                            error: "Already the email verified"
                        })
                    res.status(421)
                })
            }
            else {
                res.json(
                    {
                        error: "Email is not verified !"
                    }
                )
                res.status(401)
            }

        }
        else {
            res.json(
                {
                    error: "Email is not verified !"
                }
            )
            res.status(401)
        }
    }).catch((err) => {
        res.json(
            {
                error: "Email is not verified !"
            }
        )
        res.status(401)
    })
})

module.exports = Router