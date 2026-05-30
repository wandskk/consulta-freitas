import { NextResponse } from 'next/server'

import { ProductMysqlRepository } from '@/repositories/product.mysql.repository'

export async function GET() {
  try {
    const repository = new ProductMysqlRepository()

    const products = await repository.findMany({
      search: 'cimento',
      limit: 10,
    })

    return NextResponse.json({
      ok: true,
      total: products.length,
      products,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Erro ao buscar produtos',
      },
      { status: 500 }
    )
  }
}