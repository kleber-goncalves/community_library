import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
)`);

function createBookRepository(newBook, userId) {
    return new Promise((res, rej) => {
        const { title, author } = newBook;
        db.run(
            `
                INSERT INTO books (title, author, userId)
                VALUES (?, ?, ?)
            `,
            [title, author, userId],
            function (err) {
                if (err) {
                    rej(err);
                } else {
                    res({ id: this.lastID, ...newBook });
                }
            },
        );
    });
}

// busca todos os livros da tabela books
function findAllBooksRepository() {
    return new Promise((res, rej) => {
        db.all(
            `
            SELECT * FROM books
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

function findBookByIdRepository(bookId) {
    return new Promise((res, rej) => {
        db.get(
            `
            SELECT * FROM books WHERE id = ?
        `,
            [bookId],
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

function updateBookRepository(updatedBook, bookId) {
    return new Promise((res, rej) => {
        const fields = ["title", "author", "userId"];
        let query = "UPDATE books SET";
        const values = [];

        // loop para percorrer os campos da tabela books e atualizar os valores dos campos que forem fornecidos no objeto 'updatedBook' como argumento da função
        fields.forEach((field) => {
            if (updatedBook[field] !== undefined) {
                // adiciona o campo e o valor ao query(string) e ao array de valores
                query += ` ${field} = ?,`;
                values.push(updatedBook[field]);
            }
        });

        // remove a ultima virgula da query
        query = query.slice(0, -1);

        query += " WHERE id = ?";
        values.push(bookId);
        console.log(query);
        console.log(`Query: ${query}`);
        console.log(`Values: ${values}`);

        db.run(query, values, function (err) {
            if (err) {
                rej(err);
            } else {
                // retorna o id e o objeto 'updatedBook' com os campos atualizados
                res({ id: bookId, ...updatedBook });
            }
        });
    });
}

function deleteBookRepository(bookId) {
    return new Promise((res, rej) => {
        db.run(
            `
            DELETE FROM books
            WHERE id = ?
            `[bookId],
            function (err) {
                if (err) {
                    rej(err);
                } else {
                    res({ message: "Book deleted successfully", id: bookId });
                }
            },
        );
    });
}

function searchBookRepository(search) {
    return new Promise((res, rej) => {
        db.all(
            `
            SELECT * FROM books
            WHERE title LIKE ? OR author LIKE ?
            `,
            // O 'search' representa o termo de busca, e '%' representa um caractere curinga que corresponde a qualquer sequência de caracteres.
            [`%${search}%`, `%${search}%`],
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


export default {
    createBookRepository,
    findAllBooksRepository,
    findBookByIdRepository,
    updateBookRepository,
    deleteBookRepository,
    searchBookRepository,
};
