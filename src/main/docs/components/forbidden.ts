export const forbidden = {
    description: "Accesso negado",
    content: {
        "application/json": {
            schema: { $ref: "#/schemas/error" },
        },
    },
};
