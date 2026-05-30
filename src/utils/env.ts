export function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export function getOptionalEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback
}

export function getOptionalNumberEnv(name: string, fallback: number): number {
  const value = process.env[name]

  if (!value) {
    return fallback
  }

  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid number environment variable: ${name}`)
  }

  return parsedValue
}