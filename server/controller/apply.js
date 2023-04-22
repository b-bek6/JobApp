const Apply = require("../Model/Apply");
const Jobs = require("../Model/Jobs");

const applyJob = async (req, res, next) => {
    let job_apply = req.body.applied_jobs;
    let applied_jobs = []
    for (let index = 0; index < job_apply.length; index++) {
        let job = await Jobs.findById(job_apply[index].job_id)
        applied_jobs.push({
            job_id : job.id,
            name: job.name,
            
        })
    }
    let apply = await Apply.create({
        applied_jobs,
        jobseeker_id: req.user._id
    });
    res.send(apply);
}

module.exports = {
    applyJob
}