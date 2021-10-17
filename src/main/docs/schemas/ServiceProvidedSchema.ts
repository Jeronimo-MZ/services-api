export const ServiceProvidedSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        customerId: { type: "string" },
        providerId: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
        details: { type: "string", nullable: true },
        paymentDate: { type: "string", nullable: true },
    },
};
