const express = require('express');
const router = express.Router();
const userService = require('../services/userService');



// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create new user
router.post('/', (req, res) => {
  try {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.put('/:id', (req, res) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const deletedUser = userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getAllUsersHandler = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.get('/', getAllUsersHandler);


module.exports = {
  router,
  getAllUsersHandler // Export the handler for testing
};