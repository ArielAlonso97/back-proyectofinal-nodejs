import express from 'express';
import raspadorRoute from './raspador.router.js';

const app = express();
app.use('/send', raspadorRoute);

export default app;