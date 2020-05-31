DROP DATABASE IF EXISTS EmployeeTracker;
CREATE DATABASE EmployeeTracker;

USE EmployeeTracker;
CREATE TABLE department
(
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);


USE EmployeeTracker;
CREATE TABLE employee_role
(
	id INT NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
	PRIMARY KEY (id)
);

USE EmployeeTracker;
CREATE TABLE employee
(
	id INT NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
	PRIMARY KEY (id)
);


