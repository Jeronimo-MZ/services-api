export const loginPath = {
    post: {
        tags: ["Login"],
        summary: "Rota de autenticação de um usuário",
        requestBody: {
            content: {
                "application/json": {
                    schema: { $ref: "#/schemas/loginParams" },
                },
            },
        },
        responses: {
            200: {
                description: "sucesso",
                content: {
                    "application/json": {
                        schema: { $ref: "#/schemas/loginResponse" },
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
