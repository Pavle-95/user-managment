const User = require('../models/User'); // Import User model
const Task = require('../models/Task'); // Import Task model (assuming you have a Task model)
const bcrypt = require('bcrypt'); // For password hashing
const { Op } = require('sequelize'); // For Sequelize operators

// Create a new user
const createUser = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    try {
        // Check for existing username or email
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            role: 'basic',
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user information
const updateUser = async (req, res) => {
    // const userId = req.params.id; // Get user ID from request parameters
    const { firstName, lastName, username, email, userId } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check for unique constraints on username and email
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
                id: { [Op.ne]: userId } // Exclude current user from the check
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Update user details
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List tasks for a specific user with pagination and sorting
const listTasks = async (req, res) => {
    const userId = req.params.userId; // Get user ID from request parameters
    const { page = 1, limit = 10, sortOrder = 'DESC' } = req.query; // Pagination and sorting

    try {
        const offset = (page - 1) * limit; // Calculate offset for pagination

        const tasks = await Task.findAndCountAll({
            where: { userId }, // Filter by user ID
            order: [['createdAt', sortOrder]], // Sort by creation date
            limit,
            offset,
        });

        res.status(200).json({
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: page,
            tasks: tasks.rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin can list all tasks with pagination and sorting
const listAllTasks = async (req, res) => {
    const { page = 1, limit = 10, sortOrder = 'DESC' } = req.query; // Pagination and sorting

    try {
        const offset = (page - 1) * limit; // Calculate offset for pagination

        const tasks = await Task.findAndCountAll({
            order: [['createdAt', sortOrder]], // Sort by creation date
            limit,
            offset,
        });

        res.status(200).json({
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: page,
            tasks: tasks.rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin can update any user's task
const updateTaskByAdmin = async (req, res) => {
    const taskId = req.params.taskId; // Get task ID from request parameters

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        // Update task details here...
        
        await task.save(); // Save changes to the database

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin can delete any user's task
const deleteTaskByAdmin = async (req, res) => {
    const taskId = req.params.taskId; // Get task ID from request parameters

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        await task.destroy(); // Delete the task

        res.status(204).send(); // Send no content response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    updateUser,
    listTasks,
    listAllTasks,
    updateTaskByAdmin,
    deleteTaskByAdmin,
};