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

app.listen(8001,()=>{
    console.log("Server Started");
})