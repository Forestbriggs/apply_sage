import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy', // Handles CSS imports
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Handles TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'], // For React Testing Library setup
};

export default config;