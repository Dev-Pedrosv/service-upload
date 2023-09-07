import express from 'express'
import cors from 'cors'
import routes from './routes/routes'

const app = express()
const port = process.env.PORT || 3003

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () =>
  console.log('Servidor rodando na porta: ', port)
)
