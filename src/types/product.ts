export type Product = {
  id: number
  codigo: string
  nome: string
  codigoEan: string | null
  preco: number
  estoque: number
  localizacao: string | null
}

export type ProductSearchField = 'id' | 'codigo' | 'nome'

export type ProductDatabaseRow = {
  id: number
  codigo: string
  nome: string
  codigo_ean: string | null
  preco: string | number
  estoque: string | number
  localizacao: string | null
}

export type ProductSearchParams = {
  search: string
  searchField: ProductSearchField
  limit?: number
}

export type ProductSearchResponse = {
  total: number
  products: Product[]
}
