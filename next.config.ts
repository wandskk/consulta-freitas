import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.0.163'],
  serverExternalPackages: ['mssql', 'msnodesqlv8'],
}

export default nextConfig
