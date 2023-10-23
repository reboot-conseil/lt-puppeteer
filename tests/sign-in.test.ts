import puppeteer from "puppeteer";

describe("Filling sign-in form", () => {

    it("when not signed in, should only redirect to the dashboard page with the good credentials", async () => {
        // arrange
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();
        // act
        await page.goto(`http://localhost:3000`);
        const usernameInput = await page.$("#username");
        await usernameInput?.type("admin");
        const passwordInput = await page.$("#password");
        await passwordInput?.type("admin");
        const signInButton = await page.$('button[type="submit"]');
        await signInButton?.click();
        await (new Promise(r => setTimeout(r, 500)));
        const url = page.url();
        // assert
        expect(url).toEqual(`http://localhost:3000/dashboard`);
        // tear down
        await browser.close();
    });

    it("when signed in, should redirect to the dashboard page", async () => {
        // arrange
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();
        await page.evaluateOnNewDocument (
            token => {
              localStorage.clear();
              localStorage.setItem('token', token);
            }, 
            'eyJh...9_8cw');
        // act
        await page.goto(`http://localhost:3000`);
        await (new Promise(r => setTimeout(r, 500)));
        const location = await page.evaluate(() => window.location.href);
        // assert
        expect(location).toEqual(`http://localhost:3000/dashboard`);
        // tear down
        await page.evaluateOnNewDocument (
            () => {
              localStorage.clear();
            });
        await browser.close();
    });

});