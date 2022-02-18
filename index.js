const express = require('express')
const app = express()
const port = 3010
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtp_login, // generated ethereal user
    pass: smtp_password, // generated ethereal password
  },
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});



app.post('/sendMessage', async (req, res) => {

  let {name, subject, contact, message} = req.body


  let info = await transporter.sendMail({
    from: 'My portfolio page', // sender address
    to: "kolesnikov49r@gmail.com", // list of receivers
    subject: subject, // Subject line
    html: `<b>Сообщение с вашего портфолио</b> 
    <div>message: ${message}</div>
    <div>contact: ${contact}</div>
    <div>subject: ${subject}</div>
    <div>name: ${name}</div>`
  });

  res.send('Well done!')
})

let port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
