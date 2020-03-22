import { Config } from 'config.type'
import { Redirector } from 'Redirector'
import { RequestHandler } from 'express'

export const createRedirector = (config: Config): RequestHandler => {
  const { middleware } = new Redirector(config)
  return middleware
}
