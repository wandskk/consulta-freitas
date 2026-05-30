import type { Product, ProductDatabaseRow } from '@/types/product'

export function mapProductDatabaseRowToProduct(row: ProductDatabaseRow): Product {
  return {
    id: row.id,
    codigo: row.codigo,
    nome: row.nome,
    codigoEan: row.codigo_ean,
    preco: Number(row.preco),
    estoque: Number(row.estoque),
    localizacao: row.localizacao,
  }
}