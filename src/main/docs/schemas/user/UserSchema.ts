export const UserSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        isAdmin: { type: "boolean", default: false },
        avatar: { type: "string", nullable: true },
        occupation: { type: "string", nullable: true },
        accessToken: { type: "string", nullable: true },
    },
};
