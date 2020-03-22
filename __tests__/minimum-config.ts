import { createRedirector } from '../src'
import express from 'express'
import request from 'supertest'

const config = JSON.parse(`
{
  "destination": {
    "baseUrl": "https://dest.example.com"
  }
}
`)
const paths = ['', '/path']
const queries = ['', '?query', '?query1=foo&query2=bar']

describe('With minimum config', () => {
  const redirector = createRedirector(config)
  const app = express()
  app.use(redirector)
  paths.forEach(async path => {
    queries.forEach(async query => {
      const srcUrl = new URL(`https://src.example.com${path}${query}`)
      const destUrl = new URL(`${config.destination.baseUrl}${path}${query}`)
      const srcPathAndQueries = srcUrl.toString().split(srcUrl.host)[1]

      it(`should redirect to the same path from ${srcPathAndQueries}`, () => {
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
