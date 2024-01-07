import puppeteer from 'puppeteer';


(async () => {


    const url = 'https://www.amazon.com/s?k=amazon+basics&crid=1NVO079ZFZZS3&sprefix=amazon+basics%2Caps%2C293&ref=nb_sb_noss_2';


    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './tmp'
    });

    

        /*
            a-size-base-plus a-color-base a-text-normal
            h2 > a > span
            a-price-decimal
        */

        const page = await browser.newPage();
        const pageElement = await page.goto(url);

        const amazonProducts = [];


        const productsHandles = await page.$$(".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item");



        for(const productHandle of productsHandles){

            try{
                const title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, productHandle);               
                const price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, productHandle);
                const image = await page.evaluate(el => el.querySelector(".s-image").getAttribute('src'), productHandle);
                amazonProducts.push({title, image, price});


            }
            catch(error) {

            }
            

        }

        
         await browser.close();

         console.log(amazonProducts);
        
        

})();



