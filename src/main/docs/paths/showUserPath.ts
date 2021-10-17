export const showUserPath = {
    get: {
        tags: ["User"],
        summary: "Rota para obter dados do usuário",
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
                        schema: {
                            $ref: "#/schemas/showUserResponse",
                        },
                    },
                },
            },
            400: {
                $ref: "#/components/badRequest",
            },
            401: {
                $ref: "#/components/unauthorized",
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
