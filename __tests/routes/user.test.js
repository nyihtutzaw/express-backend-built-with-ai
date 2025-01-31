const userService = require('../../services/userService');

// Mock the userService
jest.mock('../../services/userService');

describe('Users Route - GET /', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test('should return users successfully', () => {
    // Arrange
    const mockUsers = [
      { id: 1, name: 'Test User 1', email: 'test1@example.com' },
      { id: 2, name: 'Test User 2', email: 'test2@example.com' },
    ];
    userService.getAllUsers.mockReturnValue(mockUsers);

    // Act
    const getAllUsersHandler = require('../../routes/users').getAllUsersHandler;
    getAllUsersHandler(mockRequest, mockResponse);

    // Assert
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
  });

  test('should handle error when userService throws', () => {
    // Arrange
    const errorMessage = 'Database error';
    userService.getAllUsers.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act
    const getAllUsersHandler = require('../../routes/users').getAllUsersHandler;
    getAllUsersHandler(mockRequest, mockResponse);

    // Assert
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
  });

  test('should return empty array when no users exist', () => {
    // Arrange
    userService.getAllUsers.mockReturnValue([]);

    // Act
    const getAllUsersHandler = require('../../routes/users').getAllUsersHandler;
    getAllUsersHandler(mockRequest, mockResponse);

    // Assert
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
