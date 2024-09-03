import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import type { Page } from '@inertiajs/core'
import { hydrate, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '~/lib/query_client'
import { Toaster } from 'sonner'

const queryClient = getQueryClient()

export default function render(page: Page) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => {
      let dehydratedState = {}
      if (props.initialPage.props.dehydratedState) {
        dehydratedState = props.initialPage.props.dehydratedState
        hydrate(queryClient, props.initialPage.props.dehydratedState)
      }
      return (
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <App {...props} />
            <Toaster />
          </HydrationBoundary>
        </QueryClientProvider>
      )
    },
  })
}
