export const LoadUserServicesProvidedResponseSchema = {
    type: "array",
    items: {
        $ref: "#/schemas/serviceProvided",
    },
};
