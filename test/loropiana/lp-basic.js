import puppeteer from 'puppeteer';


(async () => {


    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './tmp'
    });

    const page = await browser.newPage();

    await page.goto('https://www.loropiana.com/textile/fabrics/Fabrics/Men’s-Custom-/c/02-00031-00030-00001?q=%3Aname-asc%3Abunch%3A704&text=&bunchCode=#');

    
    
   await page.screenshot({path: 'lp-basic.png'});


   // await browser.close();


})();



