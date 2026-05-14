import userRepository from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";

async function createUserService(newUser) {
    // verifica se o user ja existe
    const foundUser = await userRepository.findUserByEmailRepository(
        newUser.email,
    );
    if (foundUser) throw new Error("User already exists");

    // criptografa a senha
    const passHash = await bcrypt.hash(newUser.password, 10);

    // cria o user com a senha criptografada
    const user = await userRepository.createUserRepository({
        ...newUser,
        password: passHash,
    });
    if (!user) throw new Error("Error creating user");
    return user;
}

export default { createUserService };
