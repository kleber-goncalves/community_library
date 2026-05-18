import jwt from "jsonwebtoken";
import userServices from "../service/userServices.js";

// Middleware de autenticação usando JWT
export function authMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;

    // Verifica se o token foi enviado
    if (!tokenHeader) {
        return res.status(401).send({ message: "Token not found" });
    }

    // 
    const partsToken = tokenHeader.split(" ");
    // Verifica se o token foi enviado no formato "Bearer <token>"
    if (partsToken.length !== 2) {
        return res.status(401).send({ message: "Invalid token" });
    }

    // Obtem o schema e o token do header do request "Bearer <token>"
    const [schema, token] = partsToken;
    // Verifica se o schema do token é Bearer
    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ message: "Malformed token" });
    }

    // Verifica se o token é valido usando o secret do arquivo .env
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // Verifica se o user existe e se o id do user do token é valido
        const user = await userServices.findUserByIdService(decoded.id);
        // Se o user nao existir ou o id do user do token nao for valido retorna um erro
        if (!user || !user.id) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // Injeta o id do user no req para o controller usar 
        req.userId = user.id;

        return next();
    });

}