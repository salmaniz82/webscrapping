import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, 'dugdalebros-links.json');
let scrapingLinks = "";
let dataExist = true;


(async () => {


    const url = 'https://shop.dugdalebros.com/natural-elements/sort/rel/rows/20/page/1/';


    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './tmp'
    });

 

        const page = await browser.newPage();
        const pageElement = await page.goto(url, {waitUntil: 'networkidle2'});
        const amazonProducts = [];


        const itemGridSelector = '#product-holder .product-holder-inner .products > .product-card';
        await page.waitForSelector(itemGridSelector);
        await page.waitForSelector(itemGridSelector);
        const productsHandles = await page.$$(itemGridSelector);

        console.log('product handles', productsHandles.length);

        for(const productHandle of productsHandles){

            try{

                const productUrl = 'https://shop.dugdalebros.com/'+ await page.evaluate(el => el.querySelector("a.content").getAttribute('href'), productHandle);
                /*
                const title = await page.evaluate(el => el.querySelector(".snize-title").textContent, productHandle);
                const price = await page.evaluate(el => el.querySelector(".snize-price.money").textContent, productHandle);
                */

                amazonProducts.push(productUrl);
                
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


        var newData = {"page03_links" : amazonProducts};
        // Add or update data in the existing object


       if(dataExist){
            Object.assign(existingData, newData);
       }
        

       var updatedJsonString = "";

        // Convert the updated JavaScript object to a JSON-formatted string
        if(dataExist){
            console.log('write when exist');
            updatedJsonString = JSON.stringify(existingData, null, 2);
        }
        else {
            console.log('write when no data is exist');
            updatedJsonString = JSON.stringify(newData, null, 2);
        }
        
        // Write the updated JSON string back to the file
        fs.writeFileSync(filePath, updatedJsonString, 'utf-8');
          


         await browser.close();

         

         
         

})();



