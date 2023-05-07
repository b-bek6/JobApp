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
    let images = [];
    try {
        if (req.files.images) {
            const storage = multer.diskStorage({
                destination: function(req, file, cb) {
                  cb(null, "/uploads");
                },
                filename: function(req, file, cb) {
                  cb(null, `${Date.now()}-${file.originalname}`);
                }
              });
              const upload = multer({ storage : storage });
            for (let i = 0; i < req.files?.images.length; i++) {
             console.log(req.files.images[i].name)
              upload.array('images')(req, res, function(err) {
                if (err) {
                  next(err);
                } else {
                  images.push(req.file.filename);
                }
              });
            }
          }
        let job = await Jobs.create({...req.body, images, created_by:req.user._id});
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