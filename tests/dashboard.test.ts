import puppeteer from "puppeteer";

describe("Dashboard", () => {

    it("should a new entry in the table", async () => {
        // arrange
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();
        // act
        await page.goto(`http://localhost:3000/dashboard`);
        const usernameInput = await page.$("#firstname");
        await usernameInput?.type("admin");
        const passwordInput = await page.$("#lastname");
        await passwordInput?.type("admin");
        const handleInput = await page.$("#handle");
        await handleInput?.type("admin");
        const submitBtn = await page.$('button[type="submit"]');
        await submitBtn?.click();
        await (new Promise(r => setTimeout(r, 500)));
        await page.waitForSelector('table > tbody > tr:nth-child(4)');
        const newEntry = await page.$('table > tbody > tr:nth-child(4)');
        const newEntryFirstNameEl = await page.$('table > tbody > tr:nth-child(4) > td:nth-child(2)');
        const newEntryFirstNameContent = await page.evaluate(element => element!.textContent, newEntryFirstNameEl);
        // assert
        expect(newEntry).toBeTruthy();
        expect(newEntryFirstNameContent).toEqual("admin");
        // tear down
        await browser.close();
    });

});