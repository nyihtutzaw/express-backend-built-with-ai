const { getAllUsers } = require('../../services/userService');

// Mock prisma client
jest.mock('../../lib/prisma', () => ({
  user: {
    findMany: jest.fn(),
  },
}));

const prisma = require('../../lib/prisma');

describe('UserService - getAllUsers', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'Test User 1',
      email: 'test1@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Test User 2',
      email: 'test2@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    prisma.user.findMany.mockReset();
  });

  test('should return all users', async () => {
    // Arrange
    prisma.user.findMany.mockResolvedValue(mockUsers);

    // Act
    const result = await getAllUsers();

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  test('should return empty array when no users exist', async () => {
    // Arrange
    prisma.user.findMany.mockResolvedValue([]);

    // Act
    const result = await getAllUsers();

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  test('should contain users with required properties', async () => {
    // Arrange
    prisma.user.findMany.mockResolvedValue(mockUsers);

    // Act
    const result = await getAllUsers();

    // Assert
    expect(Array.isArray(result)).toBe(true);
    result.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
