const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ApplySchema = new Schema({
    applied_jobs:[{
        job_id:{
            type:ObjectId,
            required:true,
            ref:"Jobs"
        },
        name:{
            type: String,
            required: true,
            maxlength: 255,
        },
        applied_date:{
            type:Date,
            default:Date.now,
            required:true,
        }
    }],
    jobseeker_id:{
        type:ObjectId,
        required:true,
        ref:"User"
    }

})
module.exports = mongoose.model("Apply", ApplySchema);
