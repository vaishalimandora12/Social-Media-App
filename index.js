require("dotenv").config()
const express = require('express');
const app = express();
const cors  = require('cors');
const path = require("path");
const PORT = process.env.PORT || 7000;
require("./database/db");


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({    
    extended: true
}));

app.use(cors({
    origin: '*'
}));

app.use(express.json());


const userRoute=require("./route/userRoute")
app.use("/",userRoute);

app.listen(PORT|| 8000,()=>{
    console.log(`App Is listing On a Port: ${PORT}`)
})