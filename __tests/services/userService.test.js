const { getAllUsers } = require('../../services/userService');
const { users } = require('../../dummyData');

// Mock the dummyData module
jest.mock('../../dummyData', () => ({
  users: [
    { id: 1, name: 'Test User 1', email: 'test1@example.com' },
    { id: 2, name: 'Test User 2', email: 'test2@example.com' },
  ],
}));

describe('UserService - getAllUsers', () => {
  test('should return all users', () => {
    // Arrange & Act
    const result = getAllUsers();

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(users);
  });

  test('should return empty array when no users exist', () => {
    // Arrange
    jest.resetModules();
    jest.mock('../../dummyData', () => ({
      users: [],
    }));
    const { getAllUsers } = require('../../services/userService');

    // Act
    const result = getAllUsers();

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  test('should return a copy of users array, not the reference', () => {
    // Arrange
    const initialUsers = [...users];

    // Act
    const result = getAllUsers();
    result.push({ id: 999, name: 'New User', email: 'new@example.com' });

    // Assert
    expect(users).toEqual(initialUsers);
    expect(users.length).toBe(initialUsers.length);
  });

  test('should contain users with required properties', () => {
    // Act
    const result = getAllUsers();

    // Assert
    result.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });
});
