import { NextResponse } from 'next/server'

import { makeProductRepository } from '@/repositories/product.repository.factory'
import { ProductService } from '@/services/product.service'
import { errorResponse, successResponse } from '@/utils/api-response'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') ?? ''
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