const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { JOBSEEKER, EMPLOYER } = require('../constants/role');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength: 255
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select:false
    },
    role:{
        type: String,
        enum:[JOBSEEKER, EMPLOYER],
        required: true,
        set: function (value) {
            return value.toLowerCase();
        }
    },

})

module.exports = mongoose.model("User", UserSchema);