CREATE DATABASE productlist;

CREATE TABLE todo(
    Category_id SERIAL PRIMARY KEY,
    Category_Name VARCHAR(255)
);


CREATE TABLE product
(product_id SERIAL PRIMARY KEY,
product_name VARCHAR(255),
category_id INTEGER REFERENCES Category(Category_id))

