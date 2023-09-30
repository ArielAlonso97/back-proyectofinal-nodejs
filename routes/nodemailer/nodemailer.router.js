import nodemailer from "nodemailer";
import express from "express";
import handlebars from "handlebars";
import fs from "fs";
import "dotenv/config";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: process.env.PERSONAL_EMAIL,
    pass: process.env.PERSONAL_PASS,
  },
});

const emailTemplateSource = fs.readFileSync("views/email-template.hbs", "utf8");

const template = handlebars.compile(emailTemplateSource);

/* const data = {
    nombreDestinatario: 'Jhon Doe',
    nombre: 'Ariel',
    apellido: 'Alvarado',
    mensajePersonalizado: 'Este es un mensaje personalizado que puedes personalizar según tus necesidades.',
  };

const emailHtml = template(data);
 */
/* const mailOptions = {
  from:  process.env.PERSONAL_EMAIL,
  to: "corvusteeme@hotmail.com",
  subject: "Asunto del Correo",
  html: emailHtml,
}; */

async function main(mailOptions) {
  try {
    const info = await transport.sendMail(mailOptions);
    console.log("mensaje enviado", info.messageId);
  } catch (err) {
    throw ("Error al enviar el mensaje", err);
  }
}

router.post("/", async (req, res) => {
    const {emailDataBody,emailOptionsBody} = req.body
  const emailData = await emailDataBody;
  const emailHtml = template(emailData);
  console.log(req.body)

  const mailOptions = {
    from: process.env.PERSONAL_EMAIL,
    to: emailOptionsBody.to,
    subject: emailOptionsBody.subject,
    html: emailHtml,
  };
  console.log(emailData);

  main(mailOptions);

  res.send("El mensaje a sido enviado");
});

export default router;
