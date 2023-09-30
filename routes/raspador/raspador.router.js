import express from "express";
import puppeteer from "puppeteer";
import jsdom from "jsdom";
import cheerio from "cheerio";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

async function scrapeSteamSpecialOffers() {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: true },{timeout: 60000});

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    page.setDefaultNavigationTimeout(100000); 
    await page.goto("https://www.yucatan.com.mx/merida/");

   

    const divSelector =
      "#main-content > div.region-secundaria > div > div > div.col-md-8 > div:nth-child(2)";

    const element = await page.$eval(divSelector, (div) => div.innerHTML);

    const $ = cheerio.load(element);

    function extractDataFromElement(cajaElement) {
      const title = cajaElement.find(".titulo a").text();
      const resumen = cajaElement.find(".resumen").text();
      const imagenSrc = cajaElement.find("img.img-responsive").attr("src");
      const noticia = cajaElement.find(".t2-izq a").attr("href");

      const data = {
        title,
        noticia,
        resumen,
        imagenSrc,
      };

      return data;
    }

    const cajaElements = $("div.caja");

    const jsonData = [];

    cajaElements.each((index, element) => {
      const data = extractDataFromElement($(element));
      jsonData.push(data);
    });

    /* console.log(element); */
    console.log("Arreglo de objetos",jsonData);

    
    /* console.log(element); */
    // Close browser.
    await browser.close();

    return jsonData; /* JSON.stringify(element.textContent); */
  } catch (error) {
    console.error("Error during scraping:", error);
    return null;
  }
}

router.get("/", async (req, res) => {
  const steamSpecialOffers = await scrapeSteamSpecialOffers();
  if (steamSpecialOffers !== null) {
    res.send(steamSpecialOffers);
  } else {
    res.status(500).send("Error scraping Steam special offers");
  }
});

export default router;
