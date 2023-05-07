const Jobs = require('../Model/Jobs');
const User = require('../Model/User');
const multer = require ('multer');

const fetchJobs = async (req, res, next) => {
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