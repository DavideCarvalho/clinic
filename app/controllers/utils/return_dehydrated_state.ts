import { dehydrate, QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import SuperJSON from 'superjson'

export function getQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: 'always',
        refetchOnReconnect: true,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  })
}

export function returnDehydratedState(client: QueryClient) {
  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: (query) =>
      defaultShouldDehydrateQuery(query) || query.state.status === 'pending', // to also include Errors
    serializeData: SuperJSON.serialize,
  })
  return {
    dehydratedState,
  }
}
