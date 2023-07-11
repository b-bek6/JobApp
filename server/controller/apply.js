const Apply = require("../Model/Apply");
const Jobs = require("../Model/Jobs");

const applyJob = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
        
    }
}
const getAppliedJobs = async (req, res, next ) => {
    try {
        let applied_jobs = await Apply.find({jobseeker_id : req.user._id})
        res.send(applied_jobs)

    } catch (error) {
        next(error)
    }
}
const deleteAppliedJobs = async (req, res, next) => {
    try {
        console.log(req.params.id)
        let apply = await Apply.findOne({ 'applied_jobs.job_id' : req.params.id});
        console.log(apply);
        if(apply){
            await Apply.findByIdAndDelete(apply._id);
            return res.status(204).end();
        } else {
            res.status(404).send("Resource not found");
        } 
        res.send({apply})
    } catch (error) {
        next(error);
    }
}
module.exports = {
    applyJob,
    getAppliedJobs,
    deleteAppliedJobs
}