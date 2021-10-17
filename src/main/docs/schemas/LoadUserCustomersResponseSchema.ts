export const LoadUserCustomersResponseSchema = {
    type: "array",
    items: {
        $ref: "#/schemas/customer",
    },
};
