const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Handler function
const getAllUsersHandler = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route
router.get('/', getAllUsersHandler);

// Export both router and handler
module.exports = {
  router,
  getAllUsersHandler,
};
