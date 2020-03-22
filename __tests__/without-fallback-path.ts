import { createRedirector } from '../src'
import express from 'express'
import request from 'supertest'

const config = JSON.parse(`
{
  "destination": {
    "baseUrl": "https://dest.example.com"
  },
  "contentMappings": [
    {
      "toPath": "/path/to/dest-1",
      "fromPath": "/path/to/src-1-1"
    }
  ]
}
`)
const queries = ['', '?query', '?query1=foo&query2=bar']

describe('With fallback path, not configured path', () => {
  const paths = ['/not-configured']

  const redirector = createRedirector(config)
  const app = express()
  app.use(redirector)
  paths.forEach(async path => {
    queries.forEach(async query => {
      const srcUrl = new URL(`https://src.example.com${path}${query}`)
      const destUrl = new URL(
        `${config.destination.baseUrl}/not-configured${query}`
      )
      const srcPathAndQueries = srcUrl.toString().split(srcUrl.host)[1]

      it(`should redirect to the fallback path from ${srcPathAndQueries}`, () => {
        return request(app)
          .get(srcPathAndQueries)
          .send()
          .then(res => {
            expect(res.status).toEqual(301)
            expect(res.header).toHaveProperty('location')
            expect(res.header['location']).toEqual(destUrl.toString())
          })
      })
    })
  })
})

describe('Without fallback path, configured path string', () => {
  const paths = ['/path/to/src-1-1']

  const redirector = createRedirector(config)
  const app = express()
  app.use(redirector)
  paths.forEach(async path => {
    queries.forEach(async query => {
      const srcUrl = new URL(`https://src.example.com${path}${query}`)
      const destUrl = new URL(
        `${config.destination.baseUrl}/path/to/dest-1${query}`
      )
      const srcPathAndQueries = srcUrl.toString().split(srcUrl.host)[1]

      it(`should redirect to the configured path: ${srcPathAndQueries}`, () => {
        return request(app)
          .get(srcPathAndQueries)
          .send()
          .then(res => {
            expect(res.status).toEqual(301)
            expect(res.header).toHaveProperty('location')
            expect(res.header['location']).toEqual(destUrl.toString())
          })
      })
    })
  })
})
