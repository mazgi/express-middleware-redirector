import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Config } from './config.type'

const defaultConfig = {
  version: '2020.3.0',
  contentMappings: []
}

export class Redirector {
  private config: Config
  private fallbackPath?: string
  private srcToDestPathMap: { [key: string]: string } = {}

  constructor(config: Config) {
    this.config = { ...defaultConfig, ...config }
    this.fallbackPath = this.config.destination.fallbackPath
    this.config.contentMappings.map(mapping => {
      const fromPaths =
        typeof mapping.fromPath === 'string'
          ? [mapping.fromPath]
          : mapping.fromPath
      fromPaths.map(fromPath => {
        this.srcToDestPathMap[fromPath] = mapping.toPath
      })
    })
  }

  whereToGo = (src: string): URL => {
    const destPath = this.srcToDestPathMap[src] || this.fallbackPath
    const destUrl = new URL(destPath || src, this.config.destination.baseUrl)
    return destUrl
  }

  public middleware: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // '/path/and?query1=foo&query2=bar'
    // => ['/path/and', '?query1=foo&query2=bar']
    const part = req.url.split(req.path)
    const queries = part[part.length - 1]

    const destUrl = this.whereToGo(req.path)
    const dest = `${destUrl.toString()}${queries}`
    res.redirect(301, dest)

    next()
  }
}
