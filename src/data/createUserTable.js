import pool from "../config/db.js";

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (      
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()  
    );
    `;
  try {         
    pool.query(query);
    console.log("Users table created or already exists");
  }catch (err) {
    console.error("Error creating users table:", err);
  }
};

export default createUserTable;

export const createTableTest = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users_tests (      
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()  
    );
    `;
  try {         
    pool.query(query);
    console.log("Users table created or already exists");
  }catch (err) {
    console.error("Error creating users table:", err);
  }
};