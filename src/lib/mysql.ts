import mysql from 'mysql2/promise'

import { databaseConfig } from '@/config/database'

let pool: mysql.Pool | null = null

export function getMysqlPool(): mysql.Pool {
  if (pool) {
    return pool
  }

  pool = mysql.createPool({
    host: databaseConfig.mysql.host,
    port: databaseConfig.mysql.port,
    user: databaseConfig.mysql.user,
    password: databaseConfig.mysql.password,
    database: databaseConfig.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60_000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  })

  return pool
}