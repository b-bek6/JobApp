const express = require('express');
const { signup, login, getUser } = require('../controller/auth');
const Joi = require('joi');
const validateSchema = require('../middleware/validateSchema');
const { checkAuthentication } = require('../middleware/checkAuthentication');
const router = express.Router();

const signupSchema = Joi.object({
    name:Joi.string().max(255).required(),
    email:Joi.string().email().required(),
    role:Joi.string().required(),
    password:Joi.string().required(),
});

const loginSchema = Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required(),
})

// const validate = (req,res) => {
//     const {error, value} = signupSchema.validate(req.body);
//     if (error) {
//         console.log(error)
//         return res.send("Invalid request")
//     }
//     res.send("Succesfully signed up")
// }

router.post("/signup",validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema),login);
router.get("/user", checkAuthentication, getUser )


module.exports = router