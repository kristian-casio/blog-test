import pool from "./database";

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Blog table created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating table", error);
    process.exit(1);
  }
};

createTable();
