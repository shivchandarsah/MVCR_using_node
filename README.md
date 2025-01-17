Student Management System
Description
The Student Management System is a web application designed to manage student records. It allows users to register, login, add new student details, update existing details, and upload student profile pictures. The system features a navbar for easy navigation and a footer for additional information. Built with Node.js, Express, Sequelize, MySQL2, and SQLite3, the project ensures efficient management of student data.

This system supports file uploads for student profile pictures and offers user authentication. Hashing of passwords is not implemented in this version of the project.

Features
User Authentication: Register and login functionality.
Student Records Management: Add, update, and view student details.
Profile Picture Upload: Upload and display a profile picture for each student.
Responsive Navbar: Navigation links for login, register, and student management.
Footer Section: A simple footer with relevant links and contact info.
Update Student Details: Modify existing student details.
No Password Hashing: Passwords are stored in plain text (Note: This should be updated to include hashing for production).
Database Management: Uses Sequelize for database operations with MySQL2 and SQLite3.
Tech Stack
Frontend: EJS (Embedded JavaScript), Bootstrap for styling
Backend: Node.js, Express.js
Database: Sequelize ORM, MySQL2, SQLite3
File Upload: Multer for handling file uploads (profile pictures)
Authentication: JWT (for secure session management)
CSS: Custom styling with Bootstrap classes

Installation
Prerequisites
Before setting up the project, ensure that you have the following installed:

Node.js (v16 or later)
MySQL or SQLite (local or cloud-based instance)
npm (or yarn) for managing packages
