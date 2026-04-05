import pool from "../config/db.js";

export const createProject = async (req, res) => {
  try {
    const { title, inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ message: "inputText is required" });
    }

    const result = await pool.query(
      `
      INSERT INTO projects (user_id, title, input_text)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [req.user.id, title || "Untitled Project", inputText]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM projects
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM projects
      WHERE id = $1 AND user_id = $2
      LIMIT 1
      `,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const existing = await pool.query(
      `
      SELECT *
      FROM projects
      WHERE id = $1 AND user_id = $2
      LIMIT 1
      `,
      [req.params.id, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    await pool.query(
      `
      DELETE FROM generations
      WHERE project_id = $1
      `,
      [req.params.id]
    );

    await pool.query(
      `
      DELETE FROM projects
      WHERE id = $1 AND user_id = $2
      `,
      [req.params.id, req.user.id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
