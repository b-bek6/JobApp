const mongoose = require ("mongoose");
const { FRESHER, JUNIOR, MID, SENIOR, FRONTEND, FULLSTACK, BACKEND, TOP, HOT, FEATURED, NORMAL } = require("../constants/job-constants");

const Schema = mongoose.Schema;
const ObjectId = Schema.objectId;

// jobs structure
const JobSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength: 255,
    },
    joblevel:{
        type: String,
        enum: [FRESHER, JUNIOR, MID, SENIOR],
        set: function (value){
            return value.toLowerCase();
        }
    },
    category:{
        type: String,
        enum: [FRONTEND, BACKEND, FULLSTACK],
        set: function (value){
            return value.toLowerCase();
        }
    },
    no_of_vacancy:{
        type: Number,
        required: true,
        default: 1,
    },
    company_name:{
        type: String,
        maxlength: 255, 
    },
    location:{
        type: String,
        required: true,
        maxlength: 255,
    },
    offered_salary:{
        type: Number,
        required: true,
        default: 0,
    },
    deadline:{
        type: Date,
    },
    type:{
        type: String,
        enum:[TOP,HOT,FEATURED,NORMAL]
    },
    created_at:{
        type:Date,
        default:Date.now,
        required:true,
    },
    description: {
        type: String
    },
    // images:{
    //     type:[String]
    // },
    created_by: {
        type:Schema.ObjectId,
        required: true,
        ref: "User"
      }
});

module.exports = mongoose.model("Jobs", JobSchema);