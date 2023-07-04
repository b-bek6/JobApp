const path = require('path');
const Jobs = require('../Model/Jobs');
const User = require('../Model/User');
const fs = require('fs');

const fetchJobs = async (req, res) => {
    res.send("This route is working properly")
    return
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
    // console.log(req.files);
    // let images = []
    // for (let index = 0; index < req.files.length; index++) {
    //     images.push(req.files[index].filename);
    // }
    // console.log(req.file);
    let image = req.file.filename;
    try {
        let job = await Jobs.create({...req.body, images:image, created_by:req.user._id});
        res.send(job);
    } catch (err) {
        res.send(err);
    }
}


const updateJobs = async(req, res, next) => {
    // console.log(req.file.image);
    // console.log(req.params.id);
    // let old_image = job_data.images
    // let image = [];
    // if(sent_image){
    //     image = req.file.filename;
    //     old_image.forEach(img => {
    //         fs.unlinkSync(path.resolve("uploads",img))
    //     });
    // }
    // old_image.forEach(img => {
    //     if(sent_images?.includes(img)){
    //         images.push(img);
    //     } else {
    //         fs.unlinkSync(path.resolve("uploads",img))
    //     }
    // })

    
    let sent_image = req.file?.filename;
    let job_data = await Jobs.findById(req.params.id);
    let old_image = job_data?.images
        if(sent_image){
            old_image?.forEach(img => {
                fs.unlinkSync(path.resolve("uploads",img));
            });
            try {
                let product = await Jobs.findByIdAndUpdate(req.params.id, {...req.body, images: sent_image}, {runValidators:true, new: true})
                res.send(product)
            } catch (err) {
                next(err)
            }
        }else{
            try {
                let product = await Jobs.findByIdAndUpdate(req.params.id, {...req.body}, {runValidators:true, new: true})
                res.send(product)
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
module.exports = {
    fetchJobs,
    storeJobs,
    updateJobs,
    removeJobs
}