module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '^.+Test\\.ts$',
  setupFiles: [__dirname + '/tests/index.ts'],
  collectCoverageFrom: [
    './src/**/*.ts',
  ],
  coverageReporters: [
    'text-summary',
  ]
};
