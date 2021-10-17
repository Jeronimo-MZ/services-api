export const CustomerSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        institution: { type: "string" },
        phone: { type: "string", nullable: true },
        providerId: { type: "string" },
    },
};
