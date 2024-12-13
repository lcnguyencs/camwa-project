export default {
  testEnvironment: 'node', // Use Node.js environment for Jest
  roots: ['<rootDir>/tests'], // Define the root directory for tests
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for JavaScript and TypeScript files
  },
  coverageDirectory: 'coverage', // Specify the directory for coverage reports
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Recognize these extensions
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Only include .ts and .tsx as ESM
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM for ts-jest (if using TypeScript)
    },
  },
};
