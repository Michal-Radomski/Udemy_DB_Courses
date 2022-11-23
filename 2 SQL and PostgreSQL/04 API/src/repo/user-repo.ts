import pool from "../pool";
import toCamelCase from "./utils/toCamelCase";

class UserRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return toCamelCase(rows);
  }

  static async findById(id: string) {
    //* Warning: Big Security Issue! - BAD CODE
    // const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id} LIMIT 1`);

    //* Prevent SQL Injection Exploit
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [id]);

    // console.log("rows:", rows, typeof rows);
    return toCamelCase(Array(rows[0]));
  }

  static async insert(username: string, bio: string) {
    const { rows } = await pool.query("INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;", [username, bio]);

    return toCamelCase(rows)[0];
  }

  static async update(id: string, username: string, bio: string) {
    const { rows } = await pool.query("UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;", [
      username,
      bio,
      id,
    ]);
    // console.log("rows:", rows);
    return toCamelCase(rows)[0];
  }

  static async delete(id: string) {
    const { rows } = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *;", [id]);
    return toCamelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query("SELECT COUNT(*) FROM users;");
    return parseInt(rows[0].count);
  }
}

export default UserRepo;
