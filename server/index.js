const express = require("express");
require('./config/database');
const app = express();
const auth_route = require('./router/auth');

// MIDDLEWARE
app.use(express.json()); // req.body (change incomming req to the json format)
app.use("/api",auth_route);

app.use((req,res)=>{
    res.status(404).send({msg:"Resource Not Found"});
})
app.use((err, req, res, next) => {
    let status = 500;
    let msg = "server error";
    let errors = null;
    console.log(err.name);

    if(err.name=="ValidationError") {
        status = 400;
        msg = "Bad Request"

        let error_arr = Object.entries(err.errors);
        let temp = [];

        errors_array.forEach(el => {
            let obj = {}
            obj.params = el[0];
            obj.msg = el[1].message;
            temp.push(obj)
        })
        error = temp;
    }
    res.status(status).send({msg: msg, errors, error: err});
})
app.listen(8001,()=>{
    console.log("Server Started");
})