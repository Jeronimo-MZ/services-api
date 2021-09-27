module.exports = {
    roots: ["<rootDir>/src/"],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/main/**/*.ts",
        "!<rootDir>/src/**/*Protocols.ts",
        "!**/mocks/**.ts",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    preset: "@shelf/jest-mongodb",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    resetModules: true,
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
};
