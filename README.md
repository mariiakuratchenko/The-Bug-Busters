Bug Repellent Web Application – Backend

COMP229 – Web Application Development
Team Name: The Bug-Busters
Project Description

The Bug Repellent Web Application is a backend API designed to manage various types of insect repellent products, including sprays, electric zappers, mosquito coils, ultrasonic devices, patches, gels, and traps.

The system provides secure user authentication, admin-based product management, advanced filtering options, and a clean API structure following RESTful principles.

This backend is built with Node.js, Express, MongoDB, and JWT Authentication.
Key Features

User registration and login (JWT-based authentication)

Admin-only product creation, updating, and deletion

Public product listing

Advanced filtering (category, insect type, price range, electric devices, indoor/outdoor, keywords)

Secure data storage in MongoDB

Fully tested with Postman

Project Structure
backend/
==> controllers/
==>  --->authController.js
==>  ---> itemController.js
==
==> middleware/
==> --->auth.js
==
==> models/
==> ---> User.js
==>  ---> Item.js
==
==> routes/
==>  ---> authRoutes.js
==> ---> itemRoutes.js
==
==>app.js
==> package.json
==> .env.example
==> README.md

### Project Manager
Faizan Wasti

### Lead Software Engineer
Geti Rahmanoghli  

### Web Designer
Jayani Yogarajah

### Ui Programmer
Mariia Kuratchenko

### Security Programmer
Jay Louis

### Database Programmer
Shared Responsibility



