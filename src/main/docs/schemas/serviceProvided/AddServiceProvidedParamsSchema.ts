export const AddServiceProvidedParamsSchema = {
    type: "object",
    properties: {
        customerId: {
            type: "string",
        },
        name: {
            type: "string",
        },
        price: {
            type: "number",
        },
        details: {
            type: "string",
        },
        paymentDate: {
            type: "string",
            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
        },
    },
    required: ["customerId", "name", "price"],
};
