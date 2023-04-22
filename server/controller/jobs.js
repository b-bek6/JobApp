const Jobs = require('../Model/Jobs');
const User = require('../Model/User');


const fetchJobs = async (req, res, next) => {
    try {
        let users = await Jobs.find({});
        res.send({data:users});
    } catch (err) {
        next(err);
    }
}
const storeJobs = async (req, res, next) => {
    try {
        let job = await Jobs.create({...req.body, created_by:req.user._id});
        res.send(job);
    } catch (err) {
        next(err);
    }
}

const updateJobs = async(req, res, next) => {
    try {
        let product = await Jobs.findByIdAndUpdate(req.params.id, {...req.body}, {runValidators:true, new: true})
        res.send(product)
    } catch (err) {
        next(err)
    }
}

const removeJobs = async (req, res, next) => {
    let job = await Jobs.findById(req.params.id);
    if(job){
        await Jobs.findByIdAndDelete(req.params.id);
        return res.status(204).end();
    } else {
        res.status(404).send("Resource not found");
    }
}

module.exports = {
    fetchJobs,
    storeJobs,
    updateJobs,
    removeJobs
}