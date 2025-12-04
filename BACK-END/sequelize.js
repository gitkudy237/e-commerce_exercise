/*
EQUELIZE: Its a popular node.js library that helps you to interact with databases using JavaScript ot TypeScript. Its known as an ORM(Object-Relational Mapping) tool.
// ORM tool: Sequelize allows you to work with your database using JavaScript objects instead of writing raw SQL queries.
//MODELS ANS ASSOSCIATION: You define models for your tables and relationships btw them (1 to many, 1 to 1, many to many, many to 1).
//QUERYING: You can perform CRUD operations (Create, Read, Update, Delete) without writing SQL.
//MIGRATION : Helps manage changes in your database schema over time.
//VALIDATION: Automatically validates data before saving it to the database.

// IN SUMMARY: Sequelize is middle tool btw our node.js backend framework(e.g: express.js) and our frontend framework(e.g vue.js, react,etc)
// It uses the node.js backend framework(e.g: espress.js) to connect to our database (MySQL,PostgreSQL,etc) and modify the database via the backend (MIGRATION)
// It modify data using JavaScript OBJECT and displays tables and relationships as Models.
// This is faster since we dont need to go back to the database to modify it anymore its just fasting.

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('e-commerce', 'root','', {
    host: 'localhost',
    dialect: 'mariadb'
});

// TESTING THE CONNECTION TO SEE IF SEQUELIZE HAVE BEEN CONNECTES TO OUR MYSQL DATABASE
sequelize.authenticate()
.then(() => console.log('Database Connected Seccessfully'))
.catch(err => console.log('Error: ' + err));

// DEFINING THE SEQUELIZE MODELS (TABLES AND RELATIONSHIP)

*/