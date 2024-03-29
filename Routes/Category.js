const express = require("express");
const router = express.Router();
const pool = require('../db');


router.post('/categorys', async (req, res) => {
    try {
        const { category_name } = req.body;
        const newTodo = await pool.query("INSERT INTO category (category_name) VALUES($1)",
            [category_name]
        );
        res.json(newTodo);

    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');

    }
});

router.get('/categorys', async (req, res) => {
    try {
        const categorylist = await pool.query("SELECT category_id , category_name FROM category");
        if (categorylist.rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(categorylist.rows);

    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/category/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        let deleteQueries = [];
        let queryParams;
        if (!isNaN(identifier)) {
            deleteQueries.push(`DELETE FROM product WHERE category_id = $1`);
            deleteQueries.push(`DELETE FROM category WHERE category_id = $1`);
            queryParams = [parseInt(identifier)];
        } else {
            deleteQueries.push(`DELETE FROM product WHERE category_id = (SELECT category_id FROM category WHERE category_name = $1)`);
            deleteQueries.push(`DELETE FROM category WHERE category_name = $1`);
            queryParams = [identifier];
        }

        // Execute the delete queries
        for (let query of deleteQueries) {
            await pool.query(query, queryParams);
        }

        res.json({ message: "Category and associated products deleted successfully" });
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/category/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        const { newCategoryId, newCategoryName } = req.body;

        let updateQuery;
        let queryParams;
        if (!isNaN(identifier)) {
            updateQuery = `UPDATE category SET category_id = $1, category_name = $2 WHERE category_id = $3`;
            queryParams = [parseInt(newCategoryId), newCategoryName, parseInt(identifier)];
        } else {
            updateQuery = `UPDATE category SET category_id = $1, category_name = $2 WHERE category_name = $3`;
            queryParams = [parseInt(newCategoryId), newCategoryName, identifier];
        }

        // Execute the update query
        await pool.query(updateQuery, queryParams);

        res.json({ message: "Category updated successfully" });
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
