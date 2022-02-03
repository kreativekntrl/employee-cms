-- SELECT <columns>
-- FROM <left_table>
-- JOIN <right_table>
-- ON <left_table>.<column> = <right_table>.<column>;

SELECT roles.id, title, salary, dpt_name
FROM department
JOIN roles ON department.id = roles.dpt_id;