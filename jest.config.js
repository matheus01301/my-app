module.exports = {
  setupFilesAfterEnv: ['<rootDir>/renderer/src/setupTests.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testMatch: [
    '<rootDir>/renderer/src/**/*.test.{ts,tsx}',
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
