// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import https from "https";
import http from "http";
import fs from "fs";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

// Routes

// Error hanling midleware

//Testing postgres connection
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database()");
        res.send(`The database name is: ${result.rows[0].current_database}`);
    } catch (err) {
        console.error(err.message);
    }
});

//Server running
app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
});