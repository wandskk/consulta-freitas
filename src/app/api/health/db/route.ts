import { NextResponse } from 'next/server'

import { getMysqlPool } from '@/lib/mysql'

export async function GET() {
  try {
    const pool = getMysqlPool()

    const [rows] = await pool.query('SELECT 1 AS status')

    return NextResponse.json({
      ok: true,
      database: 'mysql',
      result: rows,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Erro ao conectar com o banco de dados',
      },
      { status: 500 }
    )
  }
}