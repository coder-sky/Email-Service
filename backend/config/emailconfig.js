import nodemailer from 'nodemailer'
import 'dotenv/config'


export const p_transporter = nodemailer.createTransport(
    {
        service: 'gmail',
    auth: {
        user: process.env.P_GMAIL,
        pass: process.env.P_GMAIL_PASSWORD
    },
    
    }
);

export const b_transporter = nodemailer.createTransport(
    {
        service: 'gmail',
    auth: {
        user: process.env.B_GMAIL,
        pass: process.env.B_GMAIL_PASSWORD
    },
    
    }
);


