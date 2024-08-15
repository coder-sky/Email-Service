
import { b_transporter, p_transporter } from "../config/emailconfig.js";

export const sendmail = async (req, res) => {
    console.log(req.body)
    const { to, subject, msg } = req.body
    let attmpt = 1;
    let mail_type = 'primary'
    const mailOptions = {
        to: [to],
        subject: subject,
        text: msg

    };
    while (attmpt <= 4 && attmpt >= 1) {
        try {
            if (attmpt === 4) {
                await b_transporter.sendMail(mailOptions)
                mail_type='backup'
            }
            else {
                await p_transporter.sendMail(mailOptions)
            }

            return res.status(200).json({ recipient_mail: to, status: "succeeded", attempts: attmpt,type:mail_type, remark: 'Email sended successfully' })
        }
        catch (err) {
            console.log('retrying,', attmpt)
            attmpt++
        }
    }
    return res.status(500).json({ recipient_mail: to, status: "failed", attempts: attmpt-1, type:'both', remark: 'Email Requst failed try again' })






    //res.send('ok')

}