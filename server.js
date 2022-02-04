const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
    listen
} = require("express/lib/application");

// creates the connection server.js and mySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

db.query(
    "SELECT employee.id, first_name, last_name, title, salary, dpt_name FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;",
    async function (err, allData) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const {
            menuOption
        } = await inquirer.prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "mainMenu",
            choices: [
                "View all Roles",
                "Update employee role",
                "Add Role",
                "View all departments",
                "Add Department",
                "View all Employees",
                "Add employee",
                "QUIT"
            ]
        }])
    }
)