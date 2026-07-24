import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:8082/var-resa';
const OUT = 'C:\\Users\\ammar\\AppData\\Local\\Temp\\claude\\c--Users-ammar-Downloads-Customers-FlavorBoss-THECODEBASE\\8e84b050-c699-4312-93cc-4f2dd38107c0\\scratchpad';

async function run(viewport, label) {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on('pageerror', (err) => console.log(`[pageerror:${label}]`, err.message));

  await page.goto(URL, { waitUntil: 'networkidle' });

  await page.getByText('FOLLOW THE ADVENTURE', { exact: false }).first().click({ timeout: 15000 });
  await page.waitForTimeout(500);

  await page.getByText(/start.*journey|starta resan/i).first().click({ timeout: 15000 });

  // Let the year-drop/timeline transitions play out to reach the 'content' phase
  await page.waitForTimeout(6000);

  await page.screenshot({ path: `${OUT}\\fade-${label}-year1.png` });

  // Click Next to move to year index 1 so the Back button appears
  const next = page.getByRole('button', { name: /next|nästa/i });
  console.log(`[${label}] next candidates:`, await next.count());
  if (await next.count() > 0) {
    await next.first().click({ timeout: 10000, force: true });
    await page.waitForTimeout(5000);
  }

  await page.screenshot({ path: `${OUT}\\fade-${label}-year2.png` });
  await browser.close();
}

await run({ width: 390, height: 844 }, 'mobile');
await run({ width: 1440, height: 900 }, 'desktop');
console.log('done');
