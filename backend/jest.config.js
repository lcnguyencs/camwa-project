export default {
  testEnvironment: 'node', // Ensure Jest uses Node.js environment
  roots: ['<rootDir>/tests'], // Point Jest to your tests folder
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',  // Use babel-jest for both JS and TS files
  },
  coverageDirectory: 'coverage', // Optional: For generating code coverage reports
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Add other extensions as needed
};
