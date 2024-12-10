export default {
    preset: 'jest-preset-angular', // Use Jest preset for Angular
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'], // Angular's test setup file
    testEnvironment: 'jest-environment-jsdom', // jsdom for simulating browser environment
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest', // Use ts-jest for transforming TypeScript files
    },
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Map 'src' alias to the correct directory
    },
    coverageDirectory: 'coverage', // Coverage report directory
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
      'src/app/**/*.ts', // Include only TypeScript files in app folder
      '!src/app/**/*.module.ts', // Exclude Angular module files from coverage
    ],
    testMatch: ['**/?(*.)+(spec|test).ts'], // Custom test file pattern if needed
  };
  