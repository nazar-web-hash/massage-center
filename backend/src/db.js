import mysql from "mysql2/promise";

export function createPool(config) {
  return mysql.createPool({
    host: config.DB_HOST,
    port: Number(config.DB_PORT || 3306),
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}
