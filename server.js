const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
    listen
} = require("express/lib/application");
const {
    response
} = require("express");
const {
    registerPrompt
} = require("inquirer");

// creates the connection server.js and mySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

//MAIN MENU PROMPT 
function starter () {
    db.query(
        "SELECT employee.id, first_name, last_name, title, salary, dpt_name FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;",
        async function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const
                menuOption = await inquirer.prompt([{
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
                    ],
                }])
            switch (menuOption.mainMenu) {
                case "View all Roles":
                    viewRoles();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View all departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "View all Employees":
                    viewEmployees();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "QUIT":
                    db.end();
                default:
                    db.end();
            }
        }
    );
}

// View all roles
function viewRoles() {
    const sql = "SELECT * FROM roles";
    db.query(sql, function (err, results) {
        if (err) {
            console.table(err);
        }
        console.table(results);
        starter();
    })
}

// View all departments
function viewDepartments() {
    const sql = "SELECT * FROM department";
    db.query(sql, function (err, results) {
        if (err) {
            console.table(err);
        }
        console.table(results);
        starter();
    })
}

//Starts program
starter();