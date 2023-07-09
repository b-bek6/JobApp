const express = require('express');
const { checkAuthentication, isJobseeker } = require('../middleware/checkAuthentication');
const { applyJob, getAppliedJobs } = require('../controller/apply');
const router = express.Router();

router.post("/",checkAuthentication,isJobseeker, applyJob);
router.get("/",checkAuthentication,isJobseeker, getAppliedJobs);

module.exports = router;