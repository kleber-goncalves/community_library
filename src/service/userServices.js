import userRepository from "../repositories/userRepositories.js";

async function createUserService(newUser) {
    // verifica se o user ja existe
    const foundUser = await userRepository.findUserByEmailRepository(
        newUser.email,
    );
    if (foundUser) throw new Error("User already exists");

    const user = await userRepository.createUserRepository(newUser);
    return user;
}

export default { createUserService };
