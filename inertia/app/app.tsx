/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { hydrate, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '~/lib/query_client'
import { Toaster } from 'sonner'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

const queryClient = getQueryClient()

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    let dehydratedState = {}
    if (props.initialPage.props.dehydratedState) {
      dehydratedState = props.initialPage.props.dehydratedState
      hydrate(queryClient, props.initialPage.props.dehydratedState)
    }
    hydrateRoot(
      el,
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <App {...props} />
          <Toaster />
        </HydrationBoundary>
      </QueryClientProvider>
    )
  },
})
