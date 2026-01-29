CREATE DATABASE students;
USE students;
CREATE TABLE students (
  Person_Id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100),
  Email VARCHAR(100),
  Occupation VARCHAR(50)
);

INSERT INTO students (Name, Email, Occupation) VALUES
('Krishna', 'krishna@gmail.com', 'Student'),
('Venkat', 'venkat@gmail.com', 'Professor'),
('Balu', 'balu@gmail.com', 'Doctor'),
('Ram', 'ram@gmail.com', 'Software');

SELECT * FROM students;