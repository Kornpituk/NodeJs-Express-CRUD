import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const query = "SELECT * FROM users"; 
  const result = await pool.query(query);
  return result.rows;
};

export const getUserByIdService = async (id) => {
  const query = "SELECT id, name, email FROM users WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

export const createUserService = async (name, email) => {
  const query = `
    INSERT INTO users (name, email) 
    VALUES ($1, $2) 
    RETURNING *
  `;
  const result = await pool.query(query, [name, email]);
  return result.rows[0];
};

export const updateUserService = async (id, name, email) => {
  const query = `
    UPDATE users 
    SET name = $1, email = $2 
    WHERE id = $3 
    RETURNING id, name, email
  `;
  const result = await pool.query(query, [name, email, id]);
  return result.rows[0] || null;
};

export const deleteUsersService = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING id, name, email";
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};
