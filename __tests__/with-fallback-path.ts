import { createRedirector } from '../src'
import express from 'express'
import request from 'supertest'

const config = JSON.parse(`
{
  "destination": {
    "baseUrl": "https://dest.example.com",
    "fallbackPath": "/we-have-moved"
  },
  "contentMappings": [
    {
      "toPath": "/path/to/dest-1",
      "fromPath": "/path/to/src-1-1"
    },
    {
      "toPath": "/path/to/dest-2",
      "fromPath": ["/path/to/src-2-1", "/path/to/src-2-2"]
    }
  ]
}
`)
const queries = ['', '?query', '?query1=foo&query2=bar']

describe('With fallback path, fallback path', () => {
  const paths = ['/not-configured']

  const redirector = createRedirector(config)
  const app = express()
  app.use(redirector)
  paths.forEach(async path => {
    queries.forEach(async query => {
      const srcUrl = new URL(`https://src.example.com${path}${query}`)
      const destUrl = new URL(
        `${config.destination.baseUrl}/we-have-moved${query}`
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

describe('With fallback path, configured path string', () => {
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

describe('With fallback path, configured path array', () => {
  const paths = ['/path/to/src-2-1', '/path/to/src-2-2']

  const redirector = createRedirector(config)
  const app = express()
  app.use(redirector)
  paths.forEach(async path => {
    queries.forEach(async query => {
      const srcUrl = new URL(`https://src.example.com${path}${query}`)
      const destUrl = new URL(
        `${config.destination.baseUrl}/path/to/dest-2${query}`
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
