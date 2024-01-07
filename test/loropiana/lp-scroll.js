import puppeteer from 'puppeteer';


(async () => {


    const url = 'https://www.loropiana.com/textile/fabrics/Fabrics/Men’s-Custom-/c/02-00031-00030-00001?q=%3Aname-asc%3Abunch%3A696&text=&bunchCode=#';


    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './tmp'
    });

 

        const page = await browser.newPage();
        const pageElement = await page.goto(url, {waitUntil: 'networkidle2'});
        const amazonProducts = [];


        const itemGridSelector = '.product-listing.product-grid > .product-item';
        await page.waitForSelector(itemGridSelector);
        
        // Function to scroll to the bottom of the page
        async function autoScroll(page){
                await page.evaluate(async () => {
                    await new Promise((resolve, reject) => {
                        var totalHeight = 0;
                        var distance = 100;
                        var timer = setInterval(() => {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;

                            if(totalHeight >= scrollHeight){
                                clearInterval(timer);
                                resolve();
                            }
                        }, 100);
                    });
                });
            }

        await autoScroll(page);

        const productsHandles = await page.$$(itemGridSelector);
        console.log('product handles', productsHandles.length);


    await browser.close();


})();



