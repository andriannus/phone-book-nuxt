module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,js,vue}",
    "!**/index.ts",
    "!**/*.{d,enum,model,constant}.ts",
    "!<rootDir>/src/static/**",
    "!<rootDir>/src/test/**",
    "!<rootDir>/src/shared/assets/**",
  ],
};
