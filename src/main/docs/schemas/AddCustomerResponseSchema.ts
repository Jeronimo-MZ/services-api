export const AddCustomerResponseSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        institution: { type: "string" },
        phone: { type: "string", default: null },
        providerId: { type: "string" },
    },
};
