import { Request, Response } from "express";
import pool from "../database";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    const result = await pool.query("INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await pool.query("UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *", [title, content, id]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
