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

// busca todos os users da tabela users
// a função 'findAllUserRepository' é chamada para buscar todos os users da tabela users e retornar o resultado
async function findAllUsersService() {
    const users = await userRepository.findAllUserRepository();
    return users;
}

// busca um user utilizando o id do user
// a função 'findUserByIdRepository' é chamada para buscar um user utilizando o id do user
async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id);
    if (!user) throw new Error("User not found");
    return user;
}

// atualiza um user utilizando o id do user
//
async function updateUserService(newUser, userId) {
    const user = await userRepository.findUserByIdRepository(userId);
    if (!user) throw new Error("User not found");
    if (newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }

    const userUpdated = await userRepository.updateUserRepository(
        userId,
        newUser,
    );
    return userUpdated;
}

// deleta um user utilizando o id do user
async function deleteUserService(userId) {
    const user = await userRepository.findUserByIdRepository(userId);
    if (!user) throw new Error("User not found");
    const { message } = await userRepository.deleteUserRepository(userId);
    return message;
}

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService,
};
