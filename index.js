const express = require("express");
const app = express();
const pool = require('./db');
const products = require('./Routes/product');
const categorys = require('./Routes/Category');

//Middleware
app.use(express.json());
app.use('/',products);
app.use('/',categorys);


//Routes

//create all productlist









//get only productlist


//update productlist

//delete productlist




app.listen(5000, () => console.log("app is running"));