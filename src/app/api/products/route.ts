import { NextResponse } from 'next/server'

import { makeProductRepository } from '@/repositories/product.repository.factory'
import { ProductService } from '@/services/product.service'
import type { ProductSearchField } from '@/types/product'
import { errorResponse, successResponse } from '@/utils/api-response'

export const runtime = 'nodejs'

function normalizeSearchField(value: string | null): ProductSearchField {
  if (value === 'id' || value === 'codigo' || value === 'nome') {
    return value
  }

  return 'nome'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') ?? ''
    const searchField = normalizeSearchField(searchParams.get('searchField'))
    const limitParam = searchParams.get('limit')

    const limit = limitParam ? Number(limitParam) : undefined

    if (limitParam && Number.isNaN(limit)) {
      return NextResponse.json(
        errorResponse('O parâmetro limit deve ser um número válido.'),
        { status: 400 }
      )
    }

    const repository = makeProductRepository()
    const productService = new ProductService(repository)

    const products = await productService.searchProducts({
      search,
      searchField,
      limit,
    })

    return NextResponse.json(
      successResponse({
        total: products.length,
        products,
      })
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      errorResponse('Erro ao buscar produtos.'),
      { status: 500 }
    )
  }
}
