const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Userschema = mongoose.model("Userschema")
const jwt = require("jsonwebtoken")
const md5 = require("md5")
require("dotenv").config()

Router.post("/login", (req, res) => {

    var { email, password } = req.body

    if (!email || !password) {
        res.json(
            {
                error: "Please fill all fields"
            }
        )
        res.status(421)
    }
    else if (email.length < 6 || password.length < 8) {
        res.json(
            {
                error: "The password should be 8 characters and email should be 6 characters"
            }
        )
        res.status(421)
    }
    else {
        Userschema.findOne(
            {
                email: email
            }
        ).then((data) => {
            if (data) {
                bcrypt.compare(password, data.password).then((truefalse) => {
                    if (truefalse) {
                        let token = jwt.sign(
                            {
                                id: data._id,
                                role: md5(data.roleas),
                                email: data.email,
                                Name : data.username

                            }, process.env.JWTSECRETPASS, { expiresIn: "1d" }
                        )

                        res.json({token:token})
                    }
                    else {
                        res.json(
                            {
                                error: "Please check your password !"
                            }
                        )
                        res.status(401)
                    }
                })
            }
            else {
                res.json(
                    {
                        error: "User not found Please register"
                    }
                )
                res.status(421)
            }
        })
    }

})


module.exports = Router