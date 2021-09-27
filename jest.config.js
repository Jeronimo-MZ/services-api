module.exports = {
    roots: ["<rootDir>/src/"],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/main/**/*.ts",
        "!<rootDir>/src/**/*Protocols.ts",
        "!**/test/**.ts",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    resetModules: true,
};
