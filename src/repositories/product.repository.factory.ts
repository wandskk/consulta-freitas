import { databaseConfig } from '@/config/database'

import type { ProductRepository } from './product.repository'
import { ProductMysqlRepository } from './product.mysql.repository'
import { ProductSqlServerRepository } from './product.sqlserver.repository'

export function makeProductRepository(): ProductRepository {
  if (databaseConfig.driver === 'sqlserver') {
    return new ProductSqlServerRepository()
  }

  return new ProductMysqlRepository()
}