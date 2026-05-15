import userService from "../service/userServices.js";

async function createUserController(req, res) {
    const newUser = req.body;

    try {
        const user = await userService.createUserService(newUser);
        res.status(201).send({ user });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// busca todos os users
async function findAllUserController(req, res) {
    try {
        const users = await userService.findAllUsersService();
        res.status(200).send({ users });
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

// busca um user utilizando o id
async function findUserByIdController(req, res) {
    const { id } = req.params;

    try {
        const user = await userService.findUserByIdService(id);
        res.status(200).send({ user });
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

async function updateUserController(req, res) {
    const { id } = req.params;
    const newUser = req.body;

    try {
        const user = await userService.updateUserService(newUser, id);
        res.status(200).send({ user });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function deleteUserController(req, res) {
    const { id } = req.params;

    try {
        const message = await userService.deleteUserService(id);
        res.send({ message });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export default {
    createUserController,
    findAllUserController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
};
