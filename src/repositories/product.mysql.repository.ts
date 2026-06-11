import type { RowDataPacket } from 'mysql2'

import { PRODUCT_SEARCH_LIMIT } from '@/constants/product.constants'
import { mapProductDatabaseRowToProduct } from '@/helpers/product.helper'
import { getMysqlPool } from '@/lib/mysql'
import type { ProductDatabaseRow } from '@/types/product'

import type { FindProductsParams, ProductRepository } from './product.repository'

type ProductMysqlRow = ProductDatabaseRow & RowDataPacket

function makeNameSearchPattern(search: string): string {
  return `%${search.replace(/\s+/g, '%')}%`
}

export class ProductMysqlRepository implements ProductRepository {
  async findMany(params: FindProductsParams) {
    const search = params.search.trim()
    const limit = params.limit ?? PRODUCT_SEARCH_LIMIT

    if (!search) {
      return []
    }

    const searchNumber = Number(search)
    const isValidIdSearch = Number.isInteger(searchNumber)

    if (params.searchField === 'id' && !isValidIdSearch) {
      return []
    }

    const searchCondition = {
      id: 'id = ?',
      codigo: 'codigo = ?',
      nome: 'nome LIKE ?',
    }[params.searchField]
    const searchValue =
      params.searchField === 'id'
        ? searchNumber
        : params.searchField === 'nome'
          ? makeNameSearchPattern(search)
          : search

    const pool = getMysqlPool()

    const [rows] = await pool.query<ProductMysqlRow[]>(
      `
        SELECT
          id,
          codigo,
          nome,
          codigo_ean,
          preco,
          estoque,
          localizacao
        FROM products
        WHERE
          inativo = 0
          AND bloqueado = 0
          AND bloqueado_para_venda = 0
          AND ${searchCondition}
        ORDER BY nome ASC
        LIMIT ?
      `,
      [searchValue, limit]
    )

    return rows.map(mapProductDatabaseRowToProduct)
  }
}
