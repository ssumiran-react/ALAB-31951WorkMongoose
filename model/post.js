import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    "student_id" : {Type : Number,
                    require : true
                    },
    "scores" : [
        {
            "type": String,
            "score": Number
        }
    ],
    "class_id" : Number
})

