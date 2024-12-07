# User and Task Management API

## Description
This is a RESTful API built with Express.js and a SQL database for managing users and their tasks. The API supports role-based access control, allowing users with different roles (basic and admin) to perform various actions on user accounts and tasks.

## Features
- User registration and management
- Task creation, updating, listing, and deletion
- Role-based access control (basic and admin roles)
- Pagination and sorting for task listings
- Unique constraints on usernames and emails

## Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (or any compatible SQL database)
- JWT (JSON Web Tokens) for authentication
- express-validator for input validation

## Installation

### Prerequisites
- Node.js installed on your machine.
- MySQL server running.

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yettel-projektni-zadatak.git
   cd yettel-projektni-zadatak
   Install dependencies:
bash
npm install

Create a .env file in the root directory with the following content:
text
DBHOST=localhost
DBUSER=paki
DBPASSWORD=paki
DBDATABASE=yettel
JWT_SECRET=your_jwt_secret  # Change this to a strong secret key for JWT

Run the database synchronization script to create the necessary tables:
bash
node sync.js

Start the server:
bash
npm run dev  # Or use npm start if you have it configured that way.

Usage
API Endpoints
User Endpoints
Create User
POST /api/user/create
Request body:
json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}

Update User
PUT /api/user/update/:id
Request body:
json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "username": "janedoe",
  "email": "jane@example.com"
}

List User Tasks
GET /api/user/:userId/tasks
Query parameters: page, limit, sortOrder
Admin Endpoints
List All Tasks
GET /api/admin/tasks
Query parameters: page, limit, sortOrder
Update Task by Admin
PUT /api/admin/tasks/:taskId
Request body:
json
{
  "body": "Updated task description"
}

Delete Task by Admin
DELETE /api/admin/tasks/:taskId
Middleware
Authentication Middleware
This middleware checks for valid JWT tokens in the request headers to authenticate users.
Validation Middleware
This middleware validates incoming requests to ensure they meet the required schema.
Testing
You can test the API using tools like Postman or Swagger UI. Make sure to include the JWT token in the Authorization header for protected routes.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments
Inspired by various open-source projects.
text

### Instructions to Use

1. Create a new file named `README.md` in your project root directory.
2. Copy and paste the above content into that file.
3. Customize any sections as necessary, especially the repository link in the installation section (`git clone` command).

This README provides a comprehensive overview of your project, including installation instructions, usage examples, features, and more. If you need further modifications or additional sections, feel free to ask!