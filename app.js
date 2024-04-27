import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const page = await browser.newPage();

await page.goto("https://loteriasdominicanas.com/");

//const score = await page.$(".game-scores").then((el) => el.innerText())

const lotteries = await page.$$eval(".game-block", (rows) => (
    rows.map((row) => {
        const name = row.querySelector(".company-title")?.innerText.trim();
        const numbers = row.querySelector(".game-scores")?.innerText.trim();
        const date = row.querySelector(".session-date")?.innerText.trim();
        
        return { name, numbers, date };
    })
))

console.log(lotteries);

await browser.close();
