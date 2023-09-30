import express from 'express';
import nodeMailerRoute from './nodemailer.router.js';

const app = express();
app.use('/send', nodeMailerRoute);

export default app;