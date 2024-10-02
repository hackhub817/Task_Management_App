# Task Management System

## Description
A task management system built with Node.js, Express, MongoDB, and JWT authentication. It allows users to manage tasks with features like task filtering, search, and pagination.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication with JWT
- Task management with CRUD operations
- Pagination, search, and filtering
- Secure password hashing
- Responsive design

## Installation
1. Clone the repository: `git clone https://github.com/hackhub817/Task_Management_App`
2. Navigate to the directory: `cd Task_Management_Appr`
3. Install dependencies: `npm install`
4. Set up environment variables in `.env`
     DATABASE_URL=<your-mongodb-url>
     JWT_SECRET=<your-jwt-secret>

5. Start the development server: `npm start`

## Usage
1. Register a user by visiting `/signup`.
2. Login to access your tasks.
3. Create, edit, and manage tasks easily.

## API Endpoints
### Authentication
- **POST /register**: Register a new user.
- **POST /login**: Login with email and password.

### Task Management
- **GET /tasks**: Get a list of tasks.
- **POST /tasks**: Create a task.
- **PUT /tasks/:id**: Update a task.
- **DELETE /tasks/:id**: Delete a task.

## Technologies
- Node.js
- Express
- MongoDB
- JWT
- TailwindCSS

## Contributing
Feel free to contribute! Fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
