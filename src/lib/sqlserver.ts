import sql from 'mssql'

import { databaseConfig } from '@/config/database'

let pool: sql.ConnectionPool | null = null

export async function getSqlServerPool(): Promise<sql.ConnectionPool> {
  if (pool?.connected) {
    return pool
  }

  const config: sql.config = {
    user: databaseConfig.sqlServer.user,
    password: databaseConfig.sqlServer.password,
    server: databaseConfig.sqlServer.server,
    database: databaseConfig.sqlServer.database,
    options: {
      encrypt: databaseConfig.sqlServer.encrypt,
      trustServerCertificate: databaseConfig.sqlServer.trustCert,
      instanceName: databaseConfig.sqlServer.instance || undefined,
    },
  }

  pool = await sql.connect(config)

  return pool
}

export { sql }