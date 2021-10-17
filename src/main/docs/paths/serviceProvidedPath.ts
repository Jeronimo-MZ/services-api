export const serviceProvidedPath = {
    post: {
        tags: ["ServiceProvided"],
        summary: "Rota para criar um servico",
        security: [
            {
                apiKeyAuth: [],
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: { $ref: "#/schemas/addServiceProvidedParams" },
                },
            },
        },
        responses: {
            200: {
                description: "sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/addServiceProvidedResponse",
                        },
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
