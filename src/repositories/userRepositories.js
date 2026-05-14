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
            (err) => {
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
            SELECT id, username, email, avatar
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

// Este tipo de exportamente
// é para exportar funções
export default {
    createUserRepository,
    findUserByEmailRepository,
};
