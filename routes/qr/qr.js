import express from 'express';
import qrRoute from './qr.route.js';

const app = express();
app.use('/send', qrRoute);

export default app;