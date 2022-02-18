const express = require('express')
const app = express()
const port = 3010
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'nodejsmail49@gmail.com', // generated ethereal user
    pass: 'notebook49hyper', // generated ethereal password
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
