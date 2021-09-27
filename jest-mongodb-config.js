module.exports = {
    mongodbMemoryServerOptions: {
        binary: {
            version: "4.1.2",
            skipMD5: true,
        },
        instance: {
            dbName: "jest",
        },
        autoStart: false,
    },
};
