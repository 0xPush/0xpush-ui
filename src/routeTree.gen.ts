// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const PointsLazyImport = createFileRoute('/points')()
const FaqLazyImport = createFileRoute('/faq')()
const IndexLazyImport = createFileRoute('/')()
const WPrivateKeyLazyImport = createFileRoute('/w/$privateKey')()
const WPrivateKeyDepositLazyImport = createFileRoute('/w/$privateKey/deposit')()

// Create/Update Routes

const PointsLazyRoute = PointsLazyImport.update({
  path: '/points',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/points.lazy').then((d) => d.Route))

const FaqLazyRoute = FaqLazyImport.update({
  path: '/faq',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/faq.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const WPrivateKeyLazyRoute = WPrivateKeyLazyImport.update({
  path: '/w/$privateKey',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/w.$privateKey.lazy').then((d) => d.Route))

const WPrivateKeyDepositLazyRoute = WPrivateKeyDepositLazyImport.update({
  path: '/w/$privateKey/deposit',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/w_.$privateKey.deposit.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/faq': {
      preLoaderRoute: typeof FaqLazyImport
      parentRoute: typeof rootRoute
    }
    '/points': {
      preLoaderRoute: typeof PointsLazyImport
      parentRoute: typeof rootRoute
    }
    '/w/$privateKey': {
      preLoaderRoute: typeof WPrivateKeyLazyImport
      parentRoute: typeof rootRoute
    }
    '/w/$privateKey/deposit': {
      preLoaderRoute: typeof WPrivateKeyDepositLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  FaqLazyRoute,
  PointsLazyRoute,
  WPrivateKeyLazyRoute,
  WPrivateKeyDepositLazyRoute,
])
