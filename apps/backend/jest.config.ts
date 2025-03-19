module.exports = {
  displayName: 'backend',
  preset: '../../jest.preset.js', // Nx default
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/backend',
  testMatch: ['**/*.spec.ts'], // Unit tests only
};
