const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const CreateTaskSchema = new mongoose.Schema(
    {
        taskname : {
            type : String,
            required : true
        },
        fromTask : {
            type : String,
            required: true
        },
        toTask : {
            type : String,
            required: true
        },
        fromAssign : {
            type : ObjectId,
            ref : "Userschema"
        },
        toAssignEMAIL : {
            type : ObjectId,
            required : true,
            ref : "Userschema"
        },
        completed : {
            type : String,
            required : true
        }

    }
)


exports.CreateTaskSchema = mongoose.model("CreateTaskSchema", CreateTaskSchema)