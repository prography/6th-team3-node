module.exports = {
  testTimeout: 5000,
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(test)\.ts$/,
        warnOnly: true,
      },
    },
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: [/\.(test)\.ts$/],
};
