module.exports = {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom', // Required for React DOM testing
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/frontend',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};
