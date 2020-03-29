import { createRedirector } from 'express-middleware-redirector'
import express from 'express'

const app = express()
app.set('port', process.env.PORT || 4000)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('/data/config/app/config.json')
const redirector = createRedirector(config)
app.use(redirector)

app.listen(app.get('port'), () => {
  console.log(
    '⚡️ App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})
