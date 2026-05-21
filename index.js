import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouters from "./src/routes/userRoutes.js";
import bookRouters from "./src/routes/bookRoutes.js";
const app = express();

const PORT = process.env.PORT || 0;

app.use(express.json());
app.use(userRouters);
app.use(bookRouters);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
