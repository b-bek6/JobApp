const cloudinary = require('cloudinary')
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });



// exports.uploads = (file, folder) => {
//     return new Promise (resolve => {
//         cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//         { public_id: "olympic_flag" }, 
//         function(error, result) {console.log(result); });
//     })
// }

cloudinary.v2.uploader.upload();

