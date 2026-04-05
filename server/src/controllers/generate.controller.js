import pool from "../config/db.js";
import { createMusicSpec } from "../services/openai.service.js";

export const generateProjectSpec = async (req, res) => {
  try {
    const { projectId, inputText } = req.body;

    if (!projectId || !inputText) {
      return res.status(400).json({ message: "projectId and inputText are required" });
    }

    const projectCheck = await pool.query(
      `
      SELECT *
      FROM projects
      WHERE id = $1 AND user_id = $2
      LIMIT 1
      `,
      [projectId, req.user.id]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const versionResult = await pool.query(
      `
      SELECT COALESCE(MAX(generation_version), 0) AS max_version
      FROM generations
      WHERE project_id = $1
      `,
      [projectId]
    );

    const generationVersion = Number(versionResult.rows[0].max_version || 0) + 1;

    const generated = await createMusicSpec(inputText, generationVersion);

    const insertResult = await pool.query(
      `
      INSERT INTO generations (
        project_id,
        generation_version,
        input_text,
        model_name,
        schema_version,
        result
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        projectId,
        generationVersion,
        inputText,
        generated.modelName,
        generated.schemaVersion,
        JSON.stringify(generated.result)
      ]
    );

    res.json({
      success: true,
      generation: insertResult.rows[0],
      result: generated.result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectGenerations = async (req, res) => {
  try {
    const projectCheck = await pool.query(
      `
      SELECT *
      FROM projects
      WHERE id = $1 AND user_id = $2
      LIMIT 1
      `,
      [req.params.projectId, req.user.id]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const result = await pool.query(
      `
      SELECT *
      FROM generations
      WHERE project_id = $1
      ORDER BY generation_version DESC, created_at DESC
      `,
      [req.params.projectId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
