import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, 'hari-links.json');
let scrapingLinks = "";
let dataExist = true;


(async () => {


    const url = 'https://www.harrisons1863.com/brand-portfolio/collection/harrisons-mersolair';


    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './tmp'
    });

 

        const page = await browser.newPage();
        const pageElement = await page.goto(url, {waitUntil: 'networkidle2'});
        const amazonProducts = [];


        const itemGridSelector = '.container .swatch_collection > a.swatch';
        await page.waitForSelector(itemGridSelector);
        const productsHandles = await page.$$(itemGridSelector);

        console.log('product handles', productsHandles.length);

        for(const productHandle of productsHandles){

            

            try{

                const productUrl = await page.evaluate(el => el.getAttribute('href').trim(), productHandle);
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

          



            
        var newData = {"page04_links" : amazonProducts};

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



