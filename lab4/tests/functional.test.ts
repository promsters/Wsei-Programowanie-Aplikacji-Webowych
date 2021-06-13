import 'expect-puppeteer';

describe('note', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080');
    }, 10000)

    test('can be added', async () => {
        await page.type('.input-box input[name=title]', 'Testowa');
        await page.type('.input-box textarea[name=message]', 'Taki sobie test');
        await page.click('.input-box button');
        await page.waitForSelector('.notes-box:not(.pinned) .note');

        const headerEl = await page.$('.notes-box:not(.pinned) .note .header h2');
        const bodyEl = await page.$('.notes-box:not(.pinned) .note .details span');

        expect(await page.evaluate(el => el.innerHTML, headerEl)).toBe('Testowa');
        expect(await page.evaluate(el => el.innerHTML, bodyEl)).toBe('Taki sobie test');
    }, 30000);
});