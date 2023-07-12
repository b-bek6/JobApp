const express = require("express");
const multer = require("multer");
require('dotenv').config();
require('./config/database');
const cors = require('cors')
const app = express();
const auth_route = require('./router/auth');
const jobs_route = require('./router/jobs');
const jobs_apply = require('./router/apply');
app.use(express.static('uploads'));

// MIDDLEWARE
app.use(express.json()); // req.body (change incomming req to the json format)
// app.use(cors({
//     origin: "*"
// }));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use((req, res, next) => {

    function changeRequest(field) {
        if (req[field]) {
            let temp = {};
            let temp_arr = Object.entries(req[field])
            temp_arr.forEach(el => {
                if (el[0].endsWith("[]")) {
                    temp[el[0].slice(0, -2)] = Array.isArray(el[1]) ? el[1] : [el[1]]
                } else {
                    temp[el[0]] = el[1]
                }
            })
            req[field] = temp
    }
    }
    changeRequest("body")
    changeRequest("files")
    next();
})

app.use("/api",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
} , auth_route);
app.use("/api/jobs", (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
} , jobs_route);
app.use("/api/apply", (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
} , jobs_apply);

app.use((req,res)=>{
    res.status(404).send({msg:"Resources Not Found"});
})
app.use((err, req, res, next) => {
    let status = 500;
    let msg = "Server Error";
    let errors = null;
    console.log(err.name);

    if(err.name=="ValidationError") {
        status = 400;
        msg = "Bad Request"

        let errors_arr = Object.entries(err.errors);
        let temp = [];

        errors_arr.forEach(el => {
            let obj = {}
            obj.params = el[0];
            obj.msg = el[1].message;
            temp.push(obj)
        })
        errors = temp;
    }
    res.status(status).send({msg: msg, errors, error: err});
})
app.listen(8001,()=>{
    console.log("Server Started");
})