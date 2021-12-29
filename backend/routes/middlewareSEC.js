const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema") 
require("dotenv").config()

module.exports = ((req,res,next)=>
{
    var token = req.headers.tokenkey

    if(!token)
    {
        res.json(
            {
                error: "Unauthorized Access You must be login"
            }
        )
        res.status(401)
    }
    else
    {
        jwt.verify(token, process.env.JWTSECRETPASS, (err, payload)=>
        {
            // console.log(payload)

            if(payload)
            {
                Userschema.findOne(
                    {
                        $and : [{_id : payload.id}, {email : payload.email}]
                    }
                ).then((default_success_middle)=>
                {
                    // console.log()
                    if(default_success_middle)
                    {
                        req.user = default_success_middle
                        next()
                    }
                    else
                    {
                        res.json(
                            {
                                error: "Unauthorized Access You must be login"
                            }
                        )
                        res.status(401)
                    }
                })
            }
            else
            {
                res.json(
                    {
                        error: "Unauthorized Access You must be login"
                    }
                )
                res.status(401)
            }
        })
    }
})
