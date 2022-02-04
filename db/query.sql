SELECT employee.id, first_name, last_name, title, salary, dpt_name
FROM department
JOIN roles ON department.id = roles.dpt_id
JOIN employee ON employee.role_id = roles.id;


