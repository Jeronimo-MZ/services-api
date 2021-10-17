export const SignUpPath = {
    post: {
        tags: ["User"],
        summary: "Rota de Criação de um usuário",
        requestBody: {
            content: {
                "application/json": {
                    schema: { $ref: "#/schemas/signUpParams" },
                },
            },
        },
        responses: {
            200: {
                description: "sucesso",
                content: {
                    "application/json": {
                        schema: { $ref: "#/schemas/signUpResponse" },
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
