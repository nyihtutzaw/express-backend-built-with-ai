const { users } = require('../dummyData.js');

const getAllUsers = () => {
    return [...users];
};

const getUserById = (id) => {
  if (!id) throw new Error('User ID is required');
  const user = users.find(user => user.id === parseInt(id));
  if (!user) throw new Error('User not found');
  return user;
};

const createUser = (userData) => {
  if (!userData.name || !userData.email) {
    throw new Error('Name and email are required');
  }
  
  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email
  };
  
  users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  if (!id) throw new Error('User ID is required');
  
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) throw new Error('User not found');
  
  users[index] = { ...users[index], ...userData };
  return users[index];
};

const deleteUser = (id) => {
  if (!id) throw new Error('User ID is required');
  
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) throw new Error('User not found');
  
  const deletedUser = users.splice(index, 1)[0];
  return deletedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};