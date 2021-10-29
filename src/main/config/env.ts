import path from "path";

export const env = {
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/services-api",
    secret: process.env.SECRET || "dev-secret",
    staticFilesPath: path.resolve(__dirname, "../../../static"),
};
