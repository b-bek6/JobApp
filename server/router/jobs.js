const express = require('express');
const { fetchJobs, storeJobs, updateJobs, removeJobs, fetchSingleJobs, fetchEmployerJobs } = require('../controller/jobs');
const { checkAuthentication, isEmployer } = require('../middleware/checkAuthentication');
const Joi = require('joi');
const validateSchema = require('../middleware/validateSchema');
const router = express.Router();

const JobsSchema = Joi.object({
    name:Joi.string().max(255),
    joblevel:Joi.string(),
    category:Joi.string(),
    no_of_vacancy:Joi.number(),
    company_name:Joi.string(),
    location:Joi.string(),
    offered_salary:Joi.number(),
    deadline:Joi.date(),
    type:Joi.string(),
    created_at:Joi.date().raw(),
    description:Joi.string(),
    images:Joi.string(),
    created_by:Joi.string(),
})

// image store
// const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, "./uploads");
//     },
//     filename: function(req, file, cb) {
//       cb(null, `${file.fieldname}-${Date.now()}.png`);
//     }
//   });
//   const upload = multer({ storage : storage });



router.get("/" , fetchJobs);
router.get("/employer" ,checkAuthentication, fetchEmployerJobs);
router.get("/:id", fetchSingleJobs);
// router.post("/",validateSchema(JobsSchema),checkAuthentication, isEmployer, upload.single('image'), storeJobs);
router.post("/",validateSchema(JobsSchema),checkAuthentication, isEmployer, storeJobs);
// router.put("/:id",checkAuthentication, isEmployer, upload.single('image'), updateJobs);
router.put("/:id",checkAuthentication, isEmployer, updateJobs);
router.delete("/:id",checkAuthentication, isEmployer, removeJobs);



module.exports = router;