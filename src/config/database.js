import slqlite3 from "sqlite3";

// connect to the database com verification
const db = new sqlite3.Database('library_db.sqlite', (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database");
    }
});

export default db;