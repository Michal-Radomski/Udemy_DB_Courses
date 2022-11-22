import pg from "pg";

class Pool {
  _pool = null as unknown as pg.Pool;

  connect(options: pg.PoolConfig) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1 + 1;");
  }

  close() {
    return this._pool.end();
  }

  // Big security issue here!!!
  query(sql: string) {
    return this._pool.query(sql);
  }
}

// module.exports = new Pool();
export default new Pool();

//* Normally:
// const pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
// })
