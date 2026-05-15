// importa o db(banco de dados)
import db from "../config/database.js";

// cria a tabela users
// o comando ; 'IF NOT EXISTS' cria essa tabela caso ela não exista
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
    )
    `);

// função para criar um user
// Os '?' representam os campos da tabela
// Os valores dos campos são passados como um array
function createUserRepository(newUser) {
    return new Promise((res, rej) => {
        const { username, email, password, avatar } = newUser;
        db.run(
            `
                INSERT INTO users (username, email, password, avatar)
                VALUES (?, ?, ?, ?)
            `,
            [username, email, password, avatar],
            function (err) {
                if (err) {
                    rej(err);
                } else {
                    res({ id: this.lastID, ...newUser });
                }
            },
        );
    });
}

// função para encontrar um user utilizando o email
// O 'row' representa uma linha da tabela
function findUserByEmailRepository(email) {
    return new Promise((res, rej) => {
        db.get(
            `
            SELECT id, username, email, avatar, password
            FROM users
            WHERE email = ?
            `,
            [email],
            (err, row) => {
                if (err) {
                    rej(err);
                } else {
                    res(row);
                }
            },
        );
    });
}

// função para encontrar um user utilizando o id
function findUserByIdRepository(id) {
    return new Promise((res, rej) => {
        db.get(
            `
            SELECT id, username, email, avatar
            FROM users
            WHERE id = ?
            `,
            [id],
            (err, row) => {
                if (err) {
                    rej(err);
                } else {
                    res(row);
                }
            },
        );
    });
}

// função para encontrar todos os users da tabela users
// O 'rows' representa todas as linhas da tabela
function findAllUserRepository() {
    return new Promise((res, rej) => {
        db.all(
            `
                SELECT id, username, email, avatar FROM users
            `,
            [],
            (err, rows) => {
                if (err) {
                    rej(err);
                } else {
                    res(rows);
                }
            },
        );
    });
}

// função para atualizar um user
function updateUserRepository(id, user) {
    return new Promise((res, rej) => {
        const fields = ["username", "email", "password", "avatar"];
        let query = "UPDATE users SET";
        const values = [];

        fields.forEach((field) => {
            if (user[field] !== undefined) {
                query += ` ${field} = ?,`;
                values.push(user[field]);
            }
        });

        query = query.slice(0, -1);
        query += " WHERE id = ?";
        values.push(id);

        console.log(`Query: ${query}`);
        console.log(`Values: ${values}`);

        db.run(query, values, (err) => {
            if (err) {
                rej(err);
            } else {
                res({ id, ...user });
            }
        });
    });
}

// Função para deletar um user
// O 'run' porque ira fazer uma alteração do banco
async function deleteUserRepository(id) {
    return new Promise((res, rej) => {
        db.run(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [id],
            (err) => {
                if (err) {
                    rej(err);
                } else {
                    res({ message: "User deleted successfully", id });
                }
            },
        );
    });
}

// Este tipo de exportamente
// é para exportar funções
export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUserRepository,
    updateUserRepository,
    deleteUserRepository,
};
