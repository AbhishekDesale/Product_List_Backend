
const express = require("express");
const router = express.Router();
const pool = require('../db');


//Add any product in Database
router.post('/products', async (req, res) => {
    try {
        const { product_name, category_id } = req.body;
        const newTodo = await pool.query("INSERT INTO product (product_name, category_id) VALUES($1, $2)",
            [product_name, category_id]
        );
        res.json(newTodo);

    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');

    }
});

//get all productlist
router.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const product_page_Size = 10;
        const offset = (page - 1) * product_page_Size;

        const productslist = await pool.query(
            `SELECT p.product_id, p.product_name, c.Category_id, c.Category_Name FROM product p
             JOIN category c ON p.category_id = c.Category_id
             OFFSET $1 LIMIT $2`,
            [offset, product_page_Size]
        );
        if (productslist.rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(productslist.rows);


    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

//get Specific Product from product List
router.get('/products/:productDetails', async (req, res) => {
    try {
        const { productDetails } = req.params;
        const page = parseInt(req.query.page) || 1;
        console.log('Page:', page);
        const pageSize = 5;
        const offset = (page - 1) * pageSize;
        console.log('Offset:', offset);

        const products = await pool.query(
            `SELECT p.product_id, p.product_name, c.Category_id, c.Category_Name 
             FROM product p
             JOIN category c ON p.category_id = c.Category_id
             WHERE c.Category_Name = $1
             ORDER BY p.product_id
             OFFSET $2 LIMIT $3`,
            [productDetails, offset, pageSize]
        );
        if (products.rows.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(products.rows);
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');

    }
});


// Update product details
router.put('/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { product_name, category_id } = req.body;
        const updatedProduct = await pool.query(
            `UPDATE product SET product_name = $1, category_id = $2 WHERE product_id = $3 RETURNING *`,
            [product_name, category_id, productId]
        );
        res.json(updatedProduct.rows[0]);
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a product
router.delete('/products/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        let deleteQuery;
        let queryParams;
        if (!isNaN(identifier)) {
            deleteQuery = `DELETE FROM product WHERE product_id = $1`;
            queryParams = [parseInt(identifier)];
        } else {
            deleteQuery = `DELETE FROM product WHERE product_name = $1`;
            queryParams = [identifier];
        }

        await pool.query(deleteQuery, queryParams);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;