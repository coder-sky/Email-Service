import express from 'express'
import { sendmail } from '../contollers/mails.js'

const route = express.Router()

route.post('/sendmailrequest', sendmail)

export default route