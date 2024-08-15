import express  from 'express'
import cors from 'cors'
import mailRoute from './routes/mails.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/',mailRoute)


app.listen(8001,()=>{
    console.log('Backend is running at http://localhost:8001')
})