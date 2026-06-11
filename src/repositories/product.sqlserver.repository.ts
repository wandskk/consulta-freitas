import { PRODUCT_SEARCH_LIMIT } from '@/constants/product.constants'
import { getSqlServerPool, sql } from '@/lib/sqlserver'
import type { Product } from '@/types/product'

import type { FindProductsParams, ProductRepository } from './product.repository'

type ProductSqlServerRow = {
  id: number
  Codigo: string
  Nome: string
  Codigo_EAN: string | null
  Preco: number
  Estoque: number | null
  Localizacao: string | null
}

function makeNameSearchPattern(search: string): string {
  return `%${search.replace(/\s+/g, '%')}%`
}

export class ProductSqlServerRepository implements ProductRepository {
  async findMany(params: FindProductsParams): Promise<Product[]> {
    const search = params.search.trim()
    const limit = params.limit ?? PRODUCT_SEARCH_LIMIT

    if (!search) {
      return []
    }

    const searchCondition = {
      id: 'p.Id = TRY_CONVERT(INT, @search)',
      codigo: 'p.Codigo = @search',
      nome: 'p.Nome LIKE @nameSearchPattern',
    }[params.searchField]
    const nameSearchPattern = makeNameSearchPattern(search)

    const pool = await getSqlServerPool()

    const result = await pool
      .request()
      .input('search', sql.VarChar(100), search)
      .input('nameSearchPattern', sql.VarChar(100), nameSearchPattern)
      .input(
        'priceTableId',
        sql.UniqueIdentifier,
        process.env.SQLSERVER_PRICE_TABLE_ID
      )
      .input('limit', sql.Int, limit)
      .query<ProductSqlServerRow>(`
        SELECT TOP (@limit)
          p.Id AS id,
          p.Codigo,
          p.Nome,
          p.Codigo_EAN,
          pp.Preco,
          ea.Qtde AS Estoque,
          p.Localizacao
        FROM Produto p
        INNER JOIN ProdutoPreco pp
          ON pp.Produto__Ide = p.Ide
        LEFT JOIN Estoque_Atual ea
          ON ea.Produto__Ide = p.Ide
        WHERE
          pp.TabelaPreco__Ide = @priceTableId
          AND p.Inativo = 0
          AND ISNULL(p.Bloqueado, 0) = 0
          AND ISNULL(p.BloqueadoParaVenda, 0) = 0
          AND ${searchCondition}
        ORDER BY p.Nome ASC;
      `)

    return result.recordset.map((row) => ({
      id: Number(row.id),
      codigo: row.Codigo,
      nome: row.Nome,
      codigoEan: row.Codigo_EAN,
      preco: Number(row.Preco),
      estoque: Number(row.Estoque ?? 0),
      localizacao: row.Localizacao,
    }))
  }
}
