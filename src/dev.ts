import { Hono } from 'hono'
import { createGetLoadContextArgs, defaultGetLoadContext } from './react'
import type { GetLoadContext } from './react'

type Options = {
  getLoadContext: GetLoadContext
}

export const handle = (userApp?: Hono, options?: Options) => {
  const app = new Hono()

  if (userApp) {
    app.route('/', userApp)
  }

  app.all('*', async (c) => {
    // @ts-expect-error it's not typed
    const build = await import('virtual:react-router/server-build')
    const { createRequestHandler } = await import('react-router')
    const handler = createRequestHandler(build)

    const getLoadContext = options?.getLoadContext ?? defaultGetLoadContext
    const args = createGetLoadContextArgs(c)

    const remixContext = getLoadContext(args)
    return handler(c.req.raw, remixContext)
  })

  return app
}

export default handle
