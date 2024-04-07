import 'dotenv/config'
import express from 'express'
import routes from './routes'

// Create Express server
const app = express()

// Set the port
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use('/', routes)

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
