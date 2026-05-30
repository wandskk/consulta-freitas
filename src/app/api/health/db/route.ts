import { NextResponse } from 'next/server'

import { ProductMysqlRepository } from '@/repositories/product.mysql.repository'
import { ProductService } from '@/services/product.service'
import { errorResponse, successResponse } from '@/utils/api-response'

export async function GET() {
  try {
    const repository = new ProductMysqlRepository()
    const productService = new ProductService(repository)

    const products = await productService.searchProducts({
      search: 'broca',
      limit: 10,
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
      errorResponse('Erro ao buscar produtos', error),
      { status: 500 }
    )
  }
}