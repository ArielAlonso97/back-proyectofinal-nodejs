const router = express.Router();
import express from "express";
import QRCode from 'qrcode'

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const generateQR = async text => {
  try {
    const qrDataUrl = await QRCode.toDataURL(text,{ errorCorrectionLevel: 'H' });
    return qrDataUrl; // Retorna la URL de los datos del QR generado
  } catch (err) {
    console.error(err);
    throw err;
  }
}

router.post("/", async (req, res) => {
    console.log("bodyqr",req.body)
    console.log("bodyqr",req.body.text)
    
  try {
    const qrDataUrl = await generateQR(req.body.text);
    res.send({ qrDataUrl }); // Envia la URL de los datos del QR como respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el QR' });
  }
});

export default router;
