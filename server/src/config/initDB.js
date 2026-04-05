import pool from "./db.js";

export async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title TEXT,
        input_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS generations (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        result JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      ALTER TABLE generations
      ADD COLUMN IF NOT EXISTS generation_version INTEGER DEFAULT 1;
    `);

    await pool.query(`
      ALTER TABLE generations
      ADD COLUMN IF NOT EXISTS input_text TEXT DEFAULT '';
    `);

    await pool.query(`
      ALTER TABLE generations
      ADD COLUMN IF NOT EXISTS model_name TEXT DEFAULT '';
    `);

    await pool.query(`
      ALTER TABLE generations
      ADD COLUMN IF NOT EXISTS schema_version TEXT DEFAULT '1.0.0';
    `);

    console.log("DB initialized");
  } catch (err) {
    console.error("DB init error:", err);
  }
}
