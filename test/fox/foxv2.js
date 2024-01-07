import puppeteer from 'puppeteer';


(async () => {


    const url = 'https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-soft-grey';


    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './tmp'
    });

       
        const page = await browser.newPage();
        
        const pageElement = await page.goto(url, {waitUntil: 'networkidle2'});
        const amazonProducts = [];


        const itemGridSelector = 'section.Product';
        await page.waitForSelector(itemGridSelector);
        await page.waitForSelector(itemGridSelector);
        const itemHandle = await page.$(itemGridSelector);


         // Intercept network requests
        

        page.on('request', (request) => {

            // Allow all requests to continue
            request.continue();

            
        });


        page.on('response', async (response) => {

            console.log('response triggered')

            const contentType = response.headers()['content-type'];

            if (contentType && contentType.startsWith('image/')) {

                console.log(response);
               
            }

        });

        

        try{

            const title2 = await page.$eval('h1.ProductMeta__Title.Heading', titleElement => titleElement.textContent.trim());
            
            const productMetaList = await page.$$eval('.ProductMeta__Text', elements => {
                
                return elements.map(element => element.textContent.trim());
            });

            
            await page.waitForSelector('.eo-sh-price');
            const productPrice = await page.$eval('.eo-sh-price', priceele => priceele.textContent);
            await page.waitForSelector('.Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected img');
            let productImageSrc = await page.$eval('.Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected img', elementimg => elementimg.getAttribute('data-original-src'));         
            let imageUrl = new URL('https:'+productImageSrc).origin + new URL('https:'+productImageSrc).pathname;


            const metaObject = productMetaList.reduce((acc, str) => {
                const [key, value] = str.split(':');
                acc[key] = value.trim();
                return acc;
              }, {});

            let title = title2.split(':')[1].trim();
            amazonProducts.push({title, productPrice, imageUrl, metaObject});
        

        }
        catch(error) {
            console.log(error)
        }
        

        
         await browser.close();

         console.log(amazonProducts);
         

})();



