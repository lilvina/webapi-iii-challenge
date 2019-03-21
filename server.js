const express = require('express')
const helmet = require('helmet')

const server = express()
const postRouter = require('./post/postRouter.js')
const userRouter = require('./user/userRouter.js')

server.use(express.json())
server.use(helmet())

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`
    <h1>Lambda Posts API</h1>
    <p>Welcome to the Lambda Web API III Challenge</p>`)
  })

module.exports = server
