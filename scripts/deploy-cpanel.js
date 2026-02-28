/**
 * Deploy Otto 2.0 to cPanel via Playwright.
 * 1. Runs npm run build
 * 2. Zips dist/
 * 3. Logs into cPanel, opens File Manager, uploads zip to public_html, extracts
 *
 * Requires in .env: CPANEL_URL, CPANEL_USER, CPANEL_PASSWORD
 * Example CPANEL_URL: https://tudominio.com:2083
 */

import 'dotenv/config';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ZIP_PATH = path.join(ROOT, 'dist-deploy.zip');

function build() {
  console.log('Building...');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
  if (!fs.existsSync(DIST)) {
    throw new Error('dist/ not found after build');
  }
  console.log('Build OK.');
}

function createZip() {
  console.log('Creating zip...');
  const output = fs.createWriteStream(ZIP_PATH);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log('Zip created:', ZIP_PATH);
      resolve();
    });
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(DIST, false);
    archive.finalize();
  });
}

async function deploy() {
  const url = process.env.CPANEL_URL;
  const user = process.env.CPANEL_USER;
  const pass = process.env.CPANEL_PASSWORD;

  if (!url || !user || !pass) {
    console.error('Missing .env: CPANEL_URL, CPANEL_USER, CPANEL_PASSWORD');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    console.log('Opening cPanel...');
    await page.goto(url.replace(/\/$/, ''), { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(1500);

    // Si hay pantalla "Continuar" (cookies/aviso), hacer clic primero
    const continuar = page.locator('button:has-text("Continuar"), a:has-text("Continuar"), .clickthrough-cont-btn');
    if (await continuar.count() > 0) {
      await continuar.first().click({ force: true });
      await page.waitForTimeout(2000);
    }

    await page.fill('input[name="user"], input#user', user);
    await page.fill('input[name="pass"], input#pass', pass);
    // Clic en el botón de login (evitar el de "Continuar" si sigue en DOM)
    await page.locator('form input[type="submit"], form button[type="submit"], input[name="login"]').first().click();
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);

    console.log('Opening File Manager...');
    await page.locator('a:has-text("File Manager"), a[href*="filemanager"], a[title="File Manager"]').first().click();
    await page.waitForTimeout(3000);

    const page2 = context.pages().find(p => p.url().includes('filemanager')) || page;
    const active = page2;

    await active.getByRole('link', { name: /public_html/i }).first().click().catch(() => {});
    await active.waitForTimeout(2000);

    console.log('Uploading zip...');
    await active.getByRole('link', { name: /upload/i }).first().click();
    await active.waitForTimeout(1500);

    const fileInput = active.locator('input[type="file"]').first();
    await fileInput.waitFor({ state: 'attached', timeout: 5000 });
    await fileInput.setInputFiles(ZIP_PATH);
    await active.waitForTimeout(5000);

    await active.getByRole('link', { name: /go back|back/i }).first().click().catch(() => {});
    await active.waitForTimeout(3000);

    console.log('Extracting...');
    await active.getByText('dist-deploy.zip').first().click();
    await active.waitForTimeout(500);
    await active.getByRole('link', { name: /extract/i }).first().click();
    await active.waitForTimeout(1000);
    await active.locator('input[value="Extract"], button:has-text("Extract")').first().click().catch(() => {});
    await active.waitForTimeout(4000);

    console.log('Deploy done. You can close the browser.');
    await active.waitForTimeout(2000);
  } catch (err) {
    console.error('Error:', err.message);
    console.log('If your cPanel looks different, edit scripts/deploy-cpanel.js (selectors).');
    process.exitCode = 1;
  } finally {
    if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);
    await browser.close();
  }
}

(async () => {
  build();
  await createZip();
  await deploy();
})();
