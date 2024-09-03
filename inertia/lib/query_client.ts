import type { QueryClient } from '@tanstack/react-query'
import { createQueryClient } from './create_query_client'

let clientQueryClientSingleton: QueryClient | undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient()
  }
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient()
  }
  return clientQueryClientSingleton
}
