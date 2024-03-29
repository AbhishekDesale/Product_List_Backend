const express = require("express");
const router = express.Router();
const pool = require('../db');

router.post('/category', async(req,res)=>{
    try{
        const {category_name} = req.body;
        const newTodo = await pool.query("INSERT INTO category (category_name) VALUES($1)",
        [category_name]
        );
        res.json(newTodo); 

    }catch(error){
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
        
    }
});

router.get('/categorys',async(req,res)=>{
    try{
        const categorylist = await pool.query("SELECT category_id , category_name FROM category");
        if (categorylist.rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(categorylist.rows); 

    }catch(error){
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
