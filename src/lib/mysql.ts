import mysql from "mysql2/promise";

import { databaseConfig } from "@/config/database";

export function createMySqlConnection() {
  return mysql.createConnection(databaseConfig.mysql);
}
