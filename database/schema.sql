CREATE TABLE IF NOT EXISTS students (
  Person_Id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  Occupation VARCHAR(50) NOT NULL
);

INSERT INTO students (Name, Email, Occupation) VALUES
('Krishna', 'krishna@gmail.com', 'Student'),
('Venkat', 'venkat@gmail.com', 'Professor'),
('Balu', 'balu@gmail.com', 'Doctor'),
('Ram', 'ram@gmail.com', 'Software');
