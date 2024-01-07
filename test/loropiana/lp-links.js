import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, 'lp-links.json');
let scrapingLinks = "";
let dataExist = true;


(async () => {


    const url = 'https://www.loropiana.com/textile/fabrics/Fabrics/Men’s-Custom-/c/02-00031-00030-00001?q=%3Aname-asc%3Abunch%3A716&text=&bunchCode=#';


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

        for(const productHandle of productsHandles){

            

            try{

                const productUrl = await page.evaluate(el => el.querySelector("figure > a").getAttribute('href').trim(), productHandle);
                amazonProducts.push('https://www.loropiana.com'+productUrl);
                
                
            }
            catch(error) {

                console.log(error);
            }
            
        }



        
        if (!fs.existsSync(folderPath)) {
            console.log('path does not exist creating new');
            fs.mkdirSync(folderPath);
        }

        if (fs.existsSync(filePath)) {

            try{

                console.log('path existts reading existing file');
                var existingDataString = fs.readFileSync(filePath, 'utf-8');
                console.log('existing data string', existingDataString);
                console.log('type of existing string', typeof(existingDataString));
                var existingData = JSON.parse(existingDataString);

                dataExist = true;

            }catch(error) {

                if (error.code !== 'ENOENT') {
                    console.error('Error reading existing data:', error.message);
                  }

                  dataExist = false;

            }
            
          }

          
        var newData = {"page05_links" : amazonProducts};

       if(dataExist){
            Object.assign(existingData, newData);
       }
    
       var updatedJsonString = "";
   
        if(dataExist){
            console.log('write when exist');
            updatedJsonString = JSON.stringify(existingData, null, 2);
        }
        else {
            console.log('write when no data is exist');
            updatedJsonString = JSON.stringify(newData, null, 2);
        }
       
        fs.writeFileSync(filePath, updatedJsonString, 'utf-8');

        console.log(amazonProducts);

         await browser.close();

     
})();



