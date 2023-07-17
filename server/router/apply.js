const express = require('express');
const { checkAuthentication, isJobseeker, isEmployer } = require('../middleware/checkAuthentication');
const { applyJob, getAppliedJobs, deleteAppliedJobs, applicant} = require('../controller/apply');
const router = express.Router();

router.post("/",checkAuthentication,isJobseeker, applyJob);
router.get("/",checkAuthentication,isJobseeker, getAppliedJobs);
router.delete("/:id",checkAuthentication,isJobseeker, deleteAppliedJobs);
router.delete("/:id",checkAuthentication,isEmployer, applicant);

module.exports = router;