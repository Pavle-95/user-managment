const express = require('express');
const { 
    createUser,
    updateUser,
    listTasks,
    listAllTasks,
    updateTaskByAdmin,
    deleteTaskByAdmin,
} = require('../controllers/userController');

const { authenticate, authorize } = require('../middleware/authMiddleware');
const { 
    validateUserCreation,
    validateUserUpdate,
    checkValidationErrors 
} = require('../middleware/validationMiddleware');

const userRoute = express.Router();

// Route to create a new user
userRoute.post('/user/create', validateUserCreation, checkValidationErrors, createUser);

// Route to update user information
userRoute.put('/user/update/:id', authenticate, authorize(['basic', 'admin']), validateUserUpdate, checkValidationErrors, updateUser);

// Route to list tasks for a specific user
userRoute.get('/user/:userId/tasks', authenticate, listTasks);

// Route for admins to list all tasks
userRoute.get('/admin/tasks', authenticate, authorize(['admin']), listAllTasks);

// Route for admins to update a user's task
userRoute.put('/admin/tasks/:taskId', authenticate, authorize(['admin']), updateTaskByAdmin);

// Route for admins to delete a user's task
userRoute.delete('/admin/tasks/:taskId', authenticate, authorize(['admin']), deleteTaskByAdmin);

module.exports = userRoute;