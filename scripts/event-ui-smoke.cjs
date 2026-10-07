// Run with BASE_URL=http://127.0.0.1:4173 NODE_PATH=<existing Playwright node_modules> node scripts/event-ui-smoke.cjs.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const event = {
  id: 'event-1', slug: 'festival-kampus', title: 'Festival Kampus dan Kolaborasi Mahasiswa Cakrawala',
  description: 'Belajar dan bertemu komunitas kampus.\nTerbuka untuk seluruh mahasiswa.',
  cover_image_url: null, starts_at: '2026-10-10T09:00:00+07:00', ends_at: '2026-10-12T17:00:00+07:00',
  location: 'Aula kampus Cakrawala', location_url: 'https://example.com/map',
  registration_url: 'https://example.com/register', registration_open: true, organizer: 'SGA Cakrawala', status: 'upcoming',
  sessions: [{ id: 'session-1', name: 'Pembukaan', starts_at: '2026-10-10T09:00:00+07:00', ends_at: null, speaker: null, location: 'Aula utama', description: 'Sesi pembukaan.\nDilanjutkan diskusi.' }],
};

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await page.clock.install({ time: new Date('2026-10-07T08:00:00+07:00') });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/api/v1/events**', route => {
        const path = new URL(route.request().url()).pathname;
        return route.fulfill({ json: { success: true, data: path.endsWith('/festival-kampus') ? event : { items: [event] } } });
      });
      await page.goto(`${base}/events`);
      await page.getByRole('heading', { name: event.title }).waitFor();
      await page.screenshot({ path: `/tmp/events-after-${width}.png`, fullPage: true });
      const clipped = await page.locator('main').evaluate(main => [...main.querySelectorAll('h1,h2,h3,a,button')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width && (r.left < -1 || r.right > innerWidth + 1);
      }).map(el => el.textContent));
      assert.deepEqual(clipped, [], `Overflow at ${width}px`);
      if (width < 1024) {
        await page.getByRole('button', { name: 'Buka navigasi' }).click();
        assert.equal(await page.locator('#mobile-navigation').getAttribute('aria-hidden'), 'false');
        await page.keyboard.press('Escape');
        assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
        await page.getByRole('button', { name: 'Buka navigasi' }).click();
        await page.getByRole('button', { name: 'Tutup navigasi' }).click();
      }
      const lastDay = page.getByRole('button', { name: 'Senin, 12 Oktober 2026, 1 acara', exact: true });
      await lastDay.click();
      assert.equal(await lastDay.getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: 'Bulan berikutnya' }).click();
      await page.getByRole('button', { name: 'Bulan sebelumnya' }).click();
      await page.getByRole('link', { name: `Lihat detail ${event.title}`, exact: true }).click();
      await page.getByRole('heading', { name: event.title }).waitFor();
      assert.equal(await page.getByRole('link', { name: 'Daftar Sekarang' }).getAttribute('href'), event.registration_url);
      await page.getByText('Lokasi: Aula utama').waitFor();
      await page.getByRole('button', { name: 'Salin Link' }).click();
      await page.getByRole('status').filter({ hasText: /Link/ }).waitFor();
      await page.screenshot({ path: `/tmp/event-detail-after-${width}.png`, fullPage: true });
      assert.deepEqual(errors, [], `Browser exceptions at ${width}px`);
      await page.close();
    }
    const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
    await page.route('**/api/v1/events**', route => route.fulfill({ status: 500, json: { success: false } }));
    await page.goto(`${base}/events`);
    await page.getByText('Daftar event belum bisa dimuat.', { exact: false }).waitFor();
    await page.getByText('Kalender belum bisa dimuat.', { exact: false }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Coba lagi', exact: true }).count(), 2);
    await page.goto(`${base}/events/unavailable`);
    await page.getByRole('heading', { name: 'Event belum bisa dimuat' }).waitFor();
    await page.unroute('**/api/v1/events**');
    await page.route('**/api/v1/events**', route => route.fulfill({ status: 404, json: { success: false } }));
    await page.reload();
    await page.getByRole('heading', { name: 'Event tidak ditemukan' }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Coba lagi' }).count(), 0);
    console.log('PASS: six viewport widths, menu, calendar navigation, detail, registration link, copy feedback, API errors and 404. Screenshots: /tmp/events-after-*.png and /tmp/event-detail-after-*.png');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
