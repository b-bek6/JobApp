const express = require('express');
const { checkAuthentication, isJobseeker } = require('../middleware/checkAuthentication');
const { applyJob } = require('../controller/apply');
const router = express.Router();

router.post("/",checkAuthentication,isJobseeker, applyJob);

module.exports = router;