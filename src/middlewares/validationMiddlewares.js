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

export { validate };
