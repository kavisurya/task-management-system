const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Userschema = mongoose.model("Userschema") 
const md5 = require("md5")
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
                ).then((dataadmin)=>
                {

                    if(dataadmin)
                    {
                        if(md5(dataadmin.roleas) == payload.role && md5(dataadmin.roleas) == md5(process.env.ADMIN))
                        {
                            req.admin = dataadmin
                            next()
                        }
                        else
                        {
                            res.json(
                                {
                                    error: "You dont have a permission to access"
                                }
                            )
                            res.status(403)
                        }
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
