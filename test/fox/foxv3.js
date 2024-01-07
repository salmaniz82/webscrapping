import puppeteer from 'puppeteer';



var dataItemLinks = [
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-soft-grey",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-mid-grey",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-charcoal",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-classic-black",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-cricket-white",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-oatmeal",
]


(async () => {


    const url = dataItemLinks[0];


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


            const productMeta = productMetaList.reduce((acc, str) => {
                const [key, value] = str.split(':');
                acc[key] = value.trim();
                return acc;
              }, {});

            let title = title2.split(':')[1].trim();

            amazonProducts.push({title, productPrice, imageUrl, ...Object.entries(productMeta).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})});
        

        }
        catch(error) {
            console.log(error)
        }
        

        
         await browser.close();

         console.log(amazonProducts);
         

})();



