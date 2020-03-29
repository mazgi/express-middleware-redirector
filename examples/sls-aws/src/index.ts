import { createRedirector } from 'express-middleware-redirector'
import express from 'express'
import serverless from 'serverless-http'

const app = express()

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('/data/config/app/config.json')
const redirector = createRedirector(config)
app.use(redirector)

export const handler = serverless(app)
