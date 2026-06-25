import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    
    student_id: {
        Type: Number
    },
    class_id: {
        Type: Number
    },
    scores: [
        {
            "type": String,
            "score": Number
        }
    ]
})

// generate a model based off the schema (model name, schema, collection name)
export default mongoose.model("grade", gradeSchema, "grades");