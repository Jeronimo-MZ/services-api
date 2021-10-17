export const UserSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        isAdmin: { type: "boolean", default: false },
        avatar: { type: "string", default: null },
        occupation: { type: "string", default: null },
        accessToken: { type: "string", default: null },
    },
};
