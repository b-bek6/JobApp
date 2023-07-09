const jwt = require("jsonwebtoken")
const User = require("../Model/User");
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    try {
        let hash_pass = await bcrypt.hash(req.body.password, 10);
        let user = await User.create({...req.body, password: hash_pass});
        res.send(user);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    let user = await User.findOne({email: req.body.email})
    if(user){
        let isFound = await User.findById(user).select('password'); // encrypted password that has a select:false.
        let status = await bcrypt.compare(req.body.password, isFound.password);
        if(status){
            let obj = {...user.toObject()}
            let token = jwt.sign(obj, process.env.JWT_SECRET);
            return res.send({data:obj, token});
        }
    }
    return res.status(401).send({msg:"Invalid Email or Password"})
}
const getUser = async (req, res, next) => {
    res.send(req.user);
}
module.exports = {
    signup,
    login,
    getUser
}