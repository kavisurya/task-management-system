const express = require("express")
const Router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const EmailVerifyUserschema = mongoose.model("EmailVerifyUserschema")
const Userschema = mongoose.model("Userschema")
const nodemailer = require("nodemailer")
const md5 = require("md5")
require("dotenv").config()

function CheckRole(email) {
    let val = email.substring(6);
    // console.log(val)
    if (val == process.env.DOMAIN) {
        return process.env.ADMIN
    }
    else {
        return process.env.USERZ
    }
}

function Sendmail(data) {
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
        to: data.email,
        subject: "EMAIL VERIFICATION FROM KAVIN.COM",
        html: `<h1>Hii ${data.username} </h1> <br> <a href='${process.env.FRONTENDURL}confirmation?uuid=${data._id}&&hash=${md5(data.password)}'>Verification Link </a>`
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

Router.post("/signup", (req, res) => {
    var { username, email, password } = req.body

    if (!username || !email || !password) {
        res.json(
            {
                error: "Please fill all fields"
            }
        )
        res.status(421)
    }
    else if(username.length < 6 || email.length < 6|| password.length < 8 )
    {
        res.json(
            {
                error: "Username should be 6 characters and password should be 8 characters and email should be 6 characters"
            }
        )
        res.status(421)
    }
    else {

        Userschema.findOne(
            {
                email: email
            }
        ).then((matched) => {
            if (matched) {
                res.json(
                    {
                        error: "The email was already registered !!"
                    }
                )
                res.status(421)
            }
            else {
                bcrypt.hash(password, 12).then((hashedPASS) => {
                    if (hashedPASS) {
                        const insert = new EmailVerifyUserschema(
                            {
                                username,
                                email: email,
                                roleas: CheckRole(email),
                                password: hashedPASS
                            }
                        )

                        insert.save().then((data) => {
                            console.log(data)

                            if (data) {
                                Sendmail(data)
                                res.json(
                                    {
                                        success: "Please Verify your email !"
                                    }
                                )
                                res.status(200)

                            }
                        })
                    }
                })

            }
        })


    }
})

module.exports = Router