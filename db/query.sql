-- SELECT <columns>
-- FROM <left_table>
-- JOIN <right_table>
-- ON <left_table>.<column> = <right_table>.<column>;

SELECT employee.id, first_name, last_name, title, salary, dpt_name
FROM department
JOIN roles ON department.id = roles.dpt_id
JOIN employee ON employee.role_id = roles.id;

--SELECT employee.id, first_name, last_name, title, salary, 
--FROM roles
--JOIN employee ON roles.id = employee.role_id;