# Backend of Express PG Shop Application 

This documentation provides an overview of the backend application developed using Node.js and Express.js, along with PostgreSQL as the RDBMS. The application consists of two tables: Category and Product.

## Database Structure
- Table 1: Category
Columns: Category_id, Category_name
Data: Contains 6 categories - Sports, Television, Mobile, Books, Toys, Grocery

- Table 2: Product
Columns: Product_id, Product_name, Category_id (references Category.Category_id)

## Route Files
### category.js

- Endpoints:
1. POST: Add a new category
Route: /category

2. GET: Get list of category IDs
Route: /categorys

### product.js
- Endpoints:
1.POST: Add a new product with category ID
Route: /products

2.GET: Get list of all products with pagination
Route: /products?page=1

3.GET: Get list of products for a specific category with pagination
Route: /products/:categoryName?page=1

### Usage
- Running the Application
- Clone the repository.
- Install dependencies: npm install.
- Set up PostgreSQL database with the required tables and initial data.
- Start the server: npm start.
### API Endpoints
- To add a new category, send a POST request to /category with the category name in the request body.
- To get a list of category IDs, send a GET request to /categorys.
- To add a new product, send a POST request to /products with the product name and category ID in the request body.
- To get a list of all products with pagination, send a GET request to /products?page=1.
- To get a list of products for a specific category with pagination, send a GET request to /products/:categoryName?page=1.

## Note
- Ensure that the database connection is correctly configured in the application.
- Make sure to handle error cases appropriately in the frontend application.
