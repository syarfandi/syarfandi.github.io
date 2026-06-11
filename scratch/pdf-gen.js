const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const roles = [
  'devops', 'cloud', 'frontend', 'backend', 'fullstack', 
  'mobile', 'data-scientist', 'data-analyst', 'sysadmin', 
  'data-engineer', 'product-manager'
];

const langs = ['en', 'id'];

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  
  const outDir = path.resolve(__dirname, '../public/pdf');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const role of roles) {
    for (const lang of langs) {
      console.log(`Processing ${role} - ${lang}`);
      const page = await browser.newPage();
      
      let resolvePrint;
      const printPromise = new Promise(r => resolvePrint = r);

      await page.exposeFunction('onPrint', async (filename) => {
        console.log(`Generating PDF: ${filename}`);
        await page.pdf({
          path: path.join(outDir, filename),
          printBackground: true,
          preferCSSPageSize: true
        });
        resolvePrint();
      });

      await page.evaluateOnNewDocument(() => {
        window.print = () => {
          // Dummy function, will be overridden later
          window.onPrint('printed.pdf'); 
        };
      });

      await page.goto(`http://localhost:3005/${role}/`, { waitUntil: 'networkidle0' });
      
      const atsFile = await page.evaluate((l) => {
        return translations[l].atsFile;
      }, lang);
      const pdfFilename = path.basename(atsFile).replace('.md', '.pdf');
      
      await page.evaluate((pdfFilename) => {
        window.print = () => {
          window.onPrint(pdfFilename);
        };
      }, pdfFilename);

      if (lang === 'en') {
        await page.click('#toggleEN');
      } else {
        await page.click('#toggleID');
      }
      
      await page.click('#toggleATS');
      
      // Wait for content to render (markdown parse)
      await new Promise(r => setTimeout(r, 1000));
      
      await page.click('#downloadBtn');
      
      await printPromise;
      await page.close();
    }
  }

  await browser.close();
  console.log('All PDFs generated successfully.');
  process.exit(0);
})();
