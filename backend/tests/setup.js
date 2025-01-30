// tests/setup.js

// Mock PrismaClient
jest.mock('../src/prismaClient', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        task: {
          findMany: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
        },
      })),
    };
  });
  