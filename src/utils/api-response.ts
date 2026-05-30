export type ApiSuccessResponse<T> = {
  success: true
  data: T
  message?: string
}

export type ApiErrorResponse = {
  success: false
  message: string
  error?: unknown
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export function successResponse<T>(
  data: T,
  message?: string
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    message,
  }
}

export function errorResponse(
  message: string,
  error?: unknown
): ApiErrorResponse {
  return {
    success: false,
    message,
    error,
  }
}