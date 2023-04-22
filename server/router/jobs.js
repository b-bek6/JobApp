const express = require('express');
const { fetchJobs, storeJobs, updateJobs, removeJobs } = require('../controller/jobs');
const { checkAuthentication, isEmployer } = require('../middleware/checkAuthentication');
const Joi = require('joi');
const validateSchema = require('../middleware/validateSchema');
const router = express.Router();

const JobsSchema = Joi.object({
    name:Joi.string().max(255).required(),
    joblevel:Joi.string(),
    category:Joi.string(),
    no_of_vacancy:Joi.number(),
    location:Joi.string(),
    offered_salary:Joi.number(),
    deadline:Joi.date(),
    type:Joi.string(),
    created_at:Joi.date().raw(),
    description:Joi.string(),
    images:Joi.string(),
    created_by:Joi.string(),
})

router.get("/", fetchJobs);
router.post("/", validateSchema(JobsSchema),checkAuthentication, isEmployer, storeJobs);
router.put("/:id",checkAuthentication, isEmployer, updateJobs);
router.delete("/:id",checkAuthentication, isEmployer, removeJobs);
// router.delete("/:id", checkAuthentication, isEmployer, removeJobs);


module.exports = router;