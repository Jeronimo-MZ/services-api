export const SignUpResponseSchema = {
    type: "object",
    properties: {
        user: { type: "object", $ref: "#/schemas/user" },
    },
};
