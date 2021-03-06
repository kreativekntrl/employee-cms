const mysql = require("mysql2");
const inquirer = require("inquirer");

// creates the connection server.js and mySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

//MAIN MENU PROMPT 
function starter() {
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
    const sql = "SELECT title FROM roles";
    db.query(sql, function (err, results) {
        if (err) {
            console.table(err);
        }
        console.table(results);
        starter();
    })
}

// UPDATE role
function updateRole() {
    db.query(
        "SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;",
        async function (err, allEmployees) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const {
                employeeMenu
            } = await inquirer.prompt([{
                    type: "list",
                    message: "Which employee's role would you like to update",
                    name: "employeeChoice",
                    choices: allEmployees.map(inner => Object.values(inner)[0]),
                },
                {
                    type: "list",
                    message: "which role would you like to assign to the selected employee?",
                    name: "roleChoice",
                    choices: allEmployees.map(inner => Object.values(inner)[2]),
                },
            ])
            const name = "Mikayla";
            const updateQuery = "UPDATE employee SET role_id = 5 WHERE first_name = ?";
            db.query(updateQuery, name, function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log("Employee role updated!");
            })
            db.query("SELECT * FROM employee", function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.table(results);
                starter();
            })
        },
    )
}

// ADD role 
function addRole() {
    db.query(
        "SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;",
        async function (err, allRoles) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const {
                newRole
            } = await inquirer.prompt([{
                type: "input",
                message: "What is the title of the role you would like to add?",
                name: "newRole",
            }, ])
            const addQuery = "INSERT INTO roles (title, salary, dpt_id) VALUES ('Bosswoman', 500.0, 3)";
            db.query(addQuery, function (err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log("Role added!");
            })
            db.query("SELECT * FROM roles", function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.table(results);
                starter();
            })
        },
    )
}


// View all departments
function viewDepartments() {
    const sql = "SELECT dpt_name FROM department";
    db.query(sql, function (err, results) {
        if (err) {
            console.table(err);
        }
        console.table(results);
        starter();
    })
}

// Add Department
function addDepartment() {
    db.query(
        "SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;",
        async function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const {
                newDepartment
            } = await inquirer.prompt([{
                type: "input",
                message: "What is the name of the department you would like to add?",
                name: "newDepartment",
            }, ])
            const addQuery = "INSERT INTO department (dpt_name) VALUES ('HR')";
            db.query(addQuery, function (err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log("Department added!");
            })
            db.query("SELECT * FROM department", function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.table(results);
                starter();
            })
        },
    )
}


// View all Employees 
function viewEmployees() {
    const sql = "SELECT first_name, last_name FROM employee";
    db.query(sql, function (err, results) {
        if (err) {
            console.table(err);
        }
        console.table(results);
        starter();
    })
}

//ADDS employee 
function addEmployee() {
    db.query(
        "SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;",
        async function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const {
                newEmployee
            } = await inquirer.prompt([{
                    type: "input",
                    message: "What is the first name of the employee you would like to add?",
                    name: "addFirstName",
                },
                {
                    type: "input",
                    message: "What is the last name of the employee you would like to add?",
                    name: "addLastName",
                },
                {
                    type: "input",
                    message: "What is the role of the employee you would like to add?",
                    name: "addRole",
                }
            ])
            const addQuery = "INSERT INTO employee (first_name, last_name, role_id) VALUES ('Malia', 'Davis', 2)";
            db.query(addQuery, function (err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log("Employee added!");
            })
            db.query("SELECT * FROM employee", function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.table(results);
                starter();
            })
        },
    )
}

//Starts program
starter();