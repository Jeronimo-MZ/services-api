export const AddCustomerParamsSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        institution: {
            type: "string",
        },
    },
    required: ["name", "institution"],
};
