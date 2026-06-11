import { NextResponse } from 'next/server'

import { databaseConfig } from '@/config/database'
import { getMysqlPool } from '@/lib/mysql'
import { getSqlServerPool } from '@/lib/sqlserver'
import { errorResponse, successResponse } from '@/utils/api-response'

export const runtime = 'nodejs'

export async function GET() {
  try {
    if (databaseConfig.driver === 'sqlserver') {
      const pool = await getSqlServerPool()
      const result = await pool.request().query('SELECT 1 AS status')

      return NextResponse.json(
        successResponse({
          database: 'sqlserver',
          result: result.recordset,
        })
      )
    }

    const pool = getMysqlPool()

    const [rows] = await pool.query('SELECT 1 AS status')

    return NextResponse.json(
      successResponse({
        database: 'mysql',
        result: rows,
      })
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      errorResponse('Erro ao conectar com o banco de dados.'),
      { status: 500 }
    )
  }
}
