import {
  getOptionalEnv,
  getOptionalNumberEnv,
  getRequiredEnv,
} from '@/utils/env'

export const databaseConfig = {
  driver: getOptionalEnv('DB_DRIVER', 'mysql'),

  mysql: {
    host: getOptionalEnv('MYSQL_HOST', 'localhost'),
    port: getOptionalNumberEnv('MYSQL_PORT', 3306),
    user: getOptionalEnv('MYSQL_USER', 'root'),
    password: getOptionalEnv('MYSQL_PASSWORD', ''),
    database: getRequiredEnv('MYSQL_DATABASE'),
  },

  sqlServer: {
    authMode: getOptionalEnv('SQLSERVER_AUTH_MODE', 'sql').toLowerCase(),
    user: getOptionalEnv('SQLSERVER_USER', ''),
    password: getOptionalEnv('SQLSERVER_PASSWORD', ''),
    server: getOptionalEnv('SQLSERVER_SERVER', 'localhost'),
    port: getOptionalNumberEnv('SQLSERVER_PORT', 1433),
    instance: getOptionalEnv('SQLSERVER_INSTANCE', ''),
    database: getOptionalEnv('SQLSERVER_DATABASE', 'ETrade'),
    encrypt: getOptionalEnv('SQLSERVER_ENCRYPT', 'false') === 'true',
    trustCert:
      getOptionalEnv(
        'SQLSERVER_TRUST_CERT',
        getOptionalEnv('SQLSERVER_TRUST_SERVER_CERTIFICATE', 'true')
      ) === 'true',
  },
}
