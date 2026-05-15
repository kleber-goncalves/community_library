import { userIdSchema } from "../schema/userSchema.js";

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        // Retorna uma lista legível de erros estruturados pelo Zod
        return res.status(400).json({
            errors: result.error.flatten().fieldErrors,
        });
    }

    // Opcional: substitui o req.body pelos dados validados/limpos pelo Zod
    req.body = result.data;
    next();
};

const validadeUserId = (req, res, next) => {
    // Extrai o ID da URL e converte para número inteiro
    const userId = parseInt(req.params.id, 10);

    // Valida contra o objeto esperado pelo seu userIdSchema { id: ... }
    const result = userIdSchema.safeParse({ id: userId });

    if (!result.success) {
        // Retorna uma lista legível de erros estruturados pelo Zod
        return res.status(400).json({
            errors: result.error.flatten().fieldErrors,
        });
    }

    // Injeta o ID já validado e convertido de volta no req.params para o controller usar
    req.params.id = result.data.id;
    next();
};

export { validate, validadeUserId };
