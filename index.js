import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { routers } from "./src/routes/index.js";
import "./src/service/cronService.js";
const app = express();

const PORT = process.env.PORT || 0;

app.use(express.json());
app.use(routers);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
