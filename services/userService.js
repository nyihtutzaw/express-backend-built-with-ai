const prisma = require('../lib/prisma');

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  if (!id) throw new Error('User ID is required');
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!user) throw new Error('User not found');
  return user;
};

const createUser = async (userData) => {
  if (!userData.name || !userData.email) {
    throw new Error('Name and email are required');
  }
  return await prisma.user.create({
    data: userData,
  });
};

const updateUser = async (id, userData) => {
  if (!id) throw new Error('User ID is required');
  try {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });
  } catch (error) {
    console.log(error);
    throw new Error('User not found');
  }
};

const deleteUser = async (id) => {
  if (!id) throw new Error('User ID is required');
  try {
    return await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.log(error);
    throw new Error('User not found');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
