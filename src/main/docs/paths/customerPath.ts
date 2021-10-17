export const customerPath = {
    get: {
        tags: ["Customer"],
        summary: "Rota para listar clientes de um usuário",
        security: [
            {
                apiKeyAuth: [],
            },
        ],
        responses: {
            200: {
                description: "sucesso",
                content: {
                    "application/json": {
                        schema: { $ref: "#/schemas/loadUserCustomersResponse" },
                    },
                },
            },
            400: {
                $ref: "#/components/badRequest",
            },
            403: {
                $ref: "#/components/forbidden",
            },
            404: {
                $ref: "#/components/notFound",
            },
            500: {
                $ref: "#/components/serverError",
            },
        },
    },
    post: {
        tags: ["Customer"],
        summary: "Rota para criar um cliente",
        security: [
            {
                apiKeyAuth: [],
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: { $ref: "#/schemas/addCustomerParams" },
                },
            },
        },
        responses: {
            200: {
                description: "sucesso",
                content: {
                    "application/json": {
                        schema: { $ref: "#/schemas/addCustomerResponse" },
                    },
                },
            },
            400: {
                $ref: "#/components/badRequest",
            },
            403: {
                $ref: "#/components/forbidden",
            },
            404: {
                $ref: "#/components/notFound",
            },
            500: {
                $ref: "#/components/serverError",
            },
        },
    },
};
