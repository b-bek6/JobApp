const path = require('path');
const Jobs = require('../Model/Jobs');
const User = require('../Model/User');
const fs = require('fs');
const Apply = require('../Model/Apply');

const fetchJobs = async (req, res) => {
    let per_page = parseInt(req.query.per_page) || 5;
    let page = parseInt(req.query.page) || 1;
    let search_term = req.query.search_term || "";
    console.log(req.query.search_term);
    
    let sort_by = req.query.sort_by || {};
    switch(sort_by){
        case "jobnameasc":
            break
    }
    let jobs = await Jobs.aggregate([
        {
            $match: {
                $or:[
                    {name:RegExp(search_term,"i")},
                    {category:RegExp(search_term,"i")},
                    {type:RegExp(search_term,"i")}
                ]
            }
        },
        {
            $facet: {
                meta_data:[{$count:"total"},{$addFields:{per_page,page}}],
                jobs:[{$skip:((page-1)*per_page)},{$limit:per_page}]
            }
        }
    ])
    res.send({data:jobs})
}
const fetchSingleJobs = async(req, res, next ) =>{
    console.log(req.params.id)
    // try{
        let job = await Jobs.findById(req.params.id);
        res.send({job})
    // }catch(err){
    //     next(err)
    // }
    console.log(job)
}
const fetchEmployerJobs = async(req, res, next ) => {
    try {
        const employer_jobs = await Jobs.find({created_by : req.user._id})
        res.send(employer_jobs)
        console.log(employer_jobs)
        console.log(req.user._id)
    } catch (error) {
        next(error)
    }
}
const storeJobs = async (req, res, next) => {
    let image = req.file.filename;
    try {
        let job = await Jobs.create({...req.body, images:image, created_by:req.user._id});
        res.send(job);
    } catch (err) {
        res.send(err);
    }
}


const updateJobs = async(req, res, next) => {
    let sent_image = req.file?.filename;
    let job_data = await Jobs.findById(req.params.id);
    let old_image = job_data?.images
        if(sent_image){
            old_image?.forEach(img => {
                fs.unlinkSync(path.resolve("uploads",img));
            });
            try {
                let Job = await Jobs.findByIdAndUpdate(req.params.id, {...req.body, images: sent_image}, {runValidators:true, new: true})
                res.send(Job)
            } catch (err) {
                next(err)
            }
        }else{
            try {
                let Job = await Jobs.findByIdAndUpdate(req.params.id, {...req.body}, {runValidators:true, new: true})
                res.send(Job)
            } catch (err) {
                next(err)
            }
    }
}

const removeJobs = async (req, res, next) => {
    try {
        let job = await Jobs.findById(req.params.id);
        if(job){
            await Jobs.findByIdAndDelete(req.params.id);
            job.images?.forEach(img=>{
                fs.unlinkSync(path.resolve("uploads",img));
            })
            return res.status(204).end();
        } else {
            res.status(404).send("Resource not found");
        }  
    } catch (error) {
        next(error);
    }
}

// const applicant = async (req, res, next) => {
//     try {
//         // console.log(req.params.id)
//         let applied_job = await Apply.find({
//             "applied_jobs.job_id": req.params.id
//           })
//           let applicant = []
//         applied_job.forEach(async (applied,i) => {
//             let id = applied.jobseeker_id.toString();
//             applicant[i] = await User.findById({id})
//             // console.log(applicant[0]);
//             console.log(id)
//             console.log(i)
            
//         })
//         // console.log(applied_job[0].jobseeker_id);
//         res.send(applicant);
//         // res.send(applied_job[0].jobseeker_id.toString());
//     } catch (error) {
//         next(error)
//     }
// }
const applicant = async (req, res, next) => {
    try {
      let applied_job = await Apply.find({
        "applied_jobs.job_id": req.params.id
      });
      let applicantPromises = applied_job.map(async (applied) => {
        let id = applied.jobseeker_id.toString();
        return await User.findById(id);
      });
      let applicants = await Promise.all(applicantPromises);
      res.send(applicants);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    fetchJobs,
    fetchSingleJobs,
    fetchEmployerJobs,
    storeJobs,
    updateJobs,
    removeJobs,
    applicant
}