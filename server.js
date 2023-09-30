import express from 'express'
import nodemailerapp from './routes/nodemailer/nodemailer.js'
import qrapp from './routes/qr/qr.js'
import htmlapp from './routes/html/html.js'
import raspadorapp from './routes/raspador/raspador.js'
import 'dotenv/config' 
import cors from 'cors'

const app = express()
app.use(cors());

const port = process.env.PORT 

app.use('/nodemailer', nodemailerapp);
app.use('/qr', qrapp);
app.use('/html', htmlapp);
app.use('/raspador', raspadorapp);



app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
  });