import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString()
  })
})

app.get('/posts/:id', (c) => {
  const id = c.req.param('id')
  const page = c.req.query('page')

  return c.json({
    postId: id,
    page: page || '1'
  })
})

app.get('/custom', (c) => {
  c.header('X-Custom-Header', 'My Value')
  c.header('X-Powered-By', 'Hono')

  return c.text('Check the headers!')
})


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
