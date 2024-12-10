export default {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    transform: {
      '^.+\\.(js|ts)$': 'babel-jest',
    },
    coverageDirectory: 'coverage',
  };
  