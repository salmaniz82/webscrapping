import puppeteer from 'puppeteer';


(async () => {


    const browser = await puppeteer.launch({
        headless : false
    });
    const page = await browser.newPage();
    await page.goto('https://dev.juice-design.net');

    console.log(await page.evaluate(() => navigator.userAgent));

    
    await page.screenshot({path: 'example.png'});

    await browser.close();


})();



