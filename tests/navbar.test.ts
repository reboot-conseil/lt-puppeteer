import puppeteer from "puppeteer";

describe("Navbar", () => {

    it("should redirect to the dashboard page", async () => {
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();

        await page.goto(`http://localhost:3000/dashboard`);
        let navLink = await page.$('#mainNav > div > a');
        await page.evaluate((element) => {
            element!.click();
        }, navLink);
        await (new Promise(r => setTimeout(r, 500)));
        const url = page.url();
        expect(url).toEqual(`http://localhost:3000/about`);

        navLink = await page.$('#mainNav > div > a');
        await page.evaluate((element) => {
            element!.click();
        }, navLink);
        await (new Promise(r => setTimeout(r, 500)));
        const url2 = page.url();
        expect(url2).toEqual(`http://localhost:3000/dashboard`);

        await browser.close();
    });

    it("should have the right title", async () => {
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();
        await page.goto(`http://localhost:3000/dashboard`);
        const siteTitle = await page.$('.navbar-brand');
        const siteTitleText = await page.evaluate(element => element!.textContent, siteTitle);
        expect(siteTitleText).toMatch(/^Let's Talk$/);
    });

});