import dotenv from "dotenv";
import https from "https";
import http from "http";
import fs from "fs";
import pool from "./config/db.js";
import createUserTable, { createTableTest } from "./data/createUserTable.js";
import app from "./app.js";   // 👈 import app จากไฟล์ใหม่

dotenv.config();

const port = process.env.PORT || 5001;
const host = process.env.HOST || "0.0.0.0";

// Testing postgres connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("DB error");
  }
});

// ฟังก์ชัน startServers
function startServers() {
  const keyPath = process.env.SSL_KEY_PATH || "server.key";
  const certPath = process.env.SSL_CERT_PATH || "server.cert";

  let httpsOptions = null;
  try {
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
    }
  } catch (err) {
    console.error("Error reading SSL files:", err);
  }

  if (httpsOptions) {
    https.createServer(httpsOptions, app).listen(port, host, () => {
      console.log(`✅ HTTPS server running at https://localhost:${port}`);
    });
    const httpPort = process.env.HTTP_PORT || (parseInt(port, 10) + 1);
    http.createServer(app).listen(httpPort, host, () => {
      console.log(`ℹ️ HTTP server running at http://localhost:${httpPort}`);
    });
  } else {
    app.listen(port, host, () => {
      console.log(`ℹ️ HTTP server running at http://localhost:${port}`);
    });
  }
}

// Create tables before starting
createUserTable();
createTableTest();

// Start server
startServers();
