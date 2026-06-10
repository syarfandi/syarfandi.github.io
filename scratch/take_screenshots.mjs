import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const projects = [
    { id: 'kawansedarah', url: 'https://kawansedarah.org' },
    { id: 'datasulsel', url: 'https://datasulsel.kemenag.go.id' },
    { id: 'asistenvirtual', url: 'https://asistenvirtual.vercel.app' },
    { id: 'getkasir', url: 'https://getkasir.xyz' },
    { id: 'ppidparepare', url: 'https://ppidparepare.vercel.app' },
    { id: 'optracks', url: 'https://optracks.vercel.app' },
    { id: 'kegiatansulsel', url: 'https://creativebooster.vercel.app' },
    { id: 'malmora', url: 'https://malmora.com' },
    { id: 'emailserver', url: 'https://mail.makassarkota.go.id' }
];

const outDir = path.join(process.cwd(), '../public/projects');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    for (const project of projects) {
        console.log(`Taking screenshot for ${project.id}...`);
        try {
            await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60000 });
            await new Promise(r => setTimeout(r, 8000));
            await page.screenshot({ path: path.join(outDir, `${project.id}.jpg`), type: 'jpeg', quality: 80 });
            console.log(`Saved ${project.id}.jpg`);
        } catch (error) {
            console.error(`Failed to screenshot ${project.id}:`, error.message);
        }
    }

    await browser.close();
})();
