import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";

// 86400 segundos = 1 dia
// cria um token JWT
function generateJWT(id) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "Erro interno: JWT_SECRET não foi configurado no arquivo .env",
        );
    }

    return jwt.sign({ id }, secret, { expiresIn: 86400 });
}

// verifica se o user existe e se a senha esta correta
// se o user existir e a senha estiver correta, retorna o token
async function loginService(email, password) {
    const user = await userRepository.findUserByEmailRepository(email);
    if (!user) throw new Error("Invalid user");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid user");

    return generateJWT(user.id);
}

export { generateJWT, loginService };
