const mysql = require("mysql2");
const inquirer = require("inquirer");

// creates the connection server.js and mySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
  });