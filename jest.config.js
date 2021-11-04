module.exports = {
    roots: ["<rootDir>/src/", "<rootDir>/tests/"],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/main/**/*.ts",
        "!<rootDir>/src/**/protocols/**/*.ts",
        "!**/mocks/**.ts",
        "!**/**/index.ts",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    preset: "@shelf/jest-mongodb",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    resetModules: true,
    moduleNameMapper: {
        "@/tests/(.+)": "<rootDir>/tests/$1",
        "@/(.*)": "<rootDir>/src/$1",
    },
};
