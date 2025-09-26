// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import https from "https";
import http from "http";
import fs from "fs";

import userRoutes from "./routes/userRouters.js";
import errorHandling from "./middlewares/errorHandle.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;    // พอร์ตเดียวกันสำหรับตัวอย่างนี้
const host = process.env.HOST || "0.0.0.0"; // เปลี่ยนเป็น 127.0.0.1 ถ้าต้องการเฉพาะเครื่องเดียว

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).send("DB error");
  }
});

app.use("/api", userRoutes);
// Error handling middleware
app.use(errorHandling);

// ฟังก์ชันเริ่ม server: พยายามอ่าน cert ถ้ามีจะเปิด https พร้อม fallback เป็น http
function startServers() {
  const keyPath = process.env.SSL_KEY_PATH || "server.key";
  const certPath = process.env.SSL_CERT_PATH || "server.cert";

  let httpsOptions = null;
  try {
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
        // ถ้าต้องการ รองรับ client certs หรือ set TLS versions ให้เพิ่มที่นี่
      };
    }
  } catch (err) {
    console.error("Error reading SSL files:", err);
  }

  if (httpsOptions) {
    // สร้าง HTTPS server
    https.createServer(httpsOptions, app).listen(port, host, () => {
      console.log(`✅ HTTPS server running at https://localhost:${port}`);
      console.log(`✅ Accessible on LAN at https://${getLocalIP()}:${port}`);
    });

    // (ไม่จำเป็น) ถ้าต้องการให้ HTTP ยังใช้งานได้ด้วย ให้เปิดอีกพอร์ต เช่น 5000
    const httpPort = process.env.HTTP_PORT || (parseInt(port, 10) + 1);
    http.createServer(app).listen(httpPort, host, () => {
      console.log(`ℹ️ HTTP server running at http://localhost:${httpPort}`);
    });
  } else {
    // ถ้าไม่มี cert ให้รันเป็น HTTP ปกติ
    app.listen(port, host, () => {
      console.log(`ℹ️ HTTP server running at http://localhost:${port}`);
      console.log(`ℹ️ Accessible on LAN at http://${getLocalIP()}:${port}`);
    });
  }
}


// helper: พยายามหา IP ของเครื่อง (LAN)
function getLocalIP() {
  const os = awaitSafeRequire("os");
  if (!os) return "localhost";
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address;
    }
  }
  return "localhost";
}

// small helper to require sync-safe
function awaitSafeRequire(name) {
  try {
    // eslint-disable-next-line node/no-missing-require
    return require(name);
  } catch {
    return null;
  }
}

// Create table before starting servers
createUserTable();


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

startServers();