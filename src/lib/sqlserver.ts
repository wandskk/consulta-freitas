import sql from 'mssql'
import windowsSql from 'mssql/msnodesqlv8'

import { databaseConfig } from '@/config/database'

let pool: sql.ConnectionPool | null = null

function makeSqlServerConfig(): sql.config {
  const baseConfig: sql.config = {
    server: databaseConfig.sqlServer.server,
    port: databaseConfig.sqlServer.port,
    database: databaseConfig.sqlServer.database,
    options: {
      encrypt: databaseConfig.sqlServer.encrypt,
      trustServerCertificate: databaseConfig.sqlServer.trustCert,
      instanceName: databaseConfig.sqlServer.instance || undefined,
    },
  }

  if (databaseConfig.sqlServer.authMode === 'windows') {
    return {
      ...baseConfig,
      options: {
        ...baseConfig.options,
        trustedConnection: true,
      },
    }
  }

  return {
    ...baseConfig,
    user: databaseConfig.sqlServer.user,
    password: databaseConfig.sqlServer.password,
  }
}

export async function getSqlServerPool(): Promise<sql.ConnectionPool> {
  if (pool?.connected) {
    return pool
  }

  const config = makeSqlServerConfig()

  if (databaseConfig.sqlServer.authMode === 'windows') {
    pool = await windowsSql.connect(config)

    return pool
  }

  pool = await sql.connect(config)

  return pool
}

export { sql }
