import express from "express";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static("express"));

router.post('/', (req, res) => {
  const { title, text, link } = req.body;

  const generatedHtml = `
  <div class="container">
    <h2 class="text-primary">${title}</h2>
    <p class="lead">${text}</p>
    <p>Enlace de ejemplo: <a href="${link.startsWith('http') ? link : 'http://' + link}" target="_blank" class="btn btn-primary">${link}</a></p>
  </div>
`;


  res.send(generatedHtml);
});

export default router;