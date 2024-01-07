import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, "hari-data.json");
let scrapingLinks = "";
let dataExist = true;

const delay = ms => new Promise(res => setTimeout(res, ms));

const dataItemLinks = [  
  "https://www.harrisons1863.com/product/98266/",
  "https://www.harrisons1863.com/product/98271/",
  "https://www.harrisons1863.com/product/28137/",
  "https://www.harrisons1863.com/product/28379/"
];

  

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });

  const amazonProducts = [];

  try {
    for (let url of dataItemLinks) {

        url = url.replace(/:(?=\/)/, ":").replace(/\/\//g, "/");

      const page = await browser.newPage();
      
      const pageElement = await page.goto(url, { waitUntil: 'networkidle2' });

      const itemGridSelector = '.product-wrapper';
      await page.waitForSelector(itemGridSelector);
      const itemHandle = await page.$(itemGridSelector);

      try {

        const title = await page.$eval('.product-wrapper h1', titleElement => titleElement.textContent.trim());
        const productPrice = "n/a";
        await page.waitForSelector('.product_swatch');
        let productImageStyleElement = await page.$eval('.product_swatch', elementimg => elementimg.getAttribute('style'));
        let imageUrl = productImageStyleElement.match(/url\(['"]?(.*?)['"]?\)/)[1];

        /*
        let imageUrl = new URL('https:' + productImageSrc).origin + new URL('https:' + productImageSrc).pathname;
        */

        
        const brand = await page.$eval('.product_info .pri_row.pri_tax:nth-child(1) a', element => element.textContent.trim());
        const collection = await page.$eval('.product_info .pri_row.pri_tax:nth-child(2) a', element => element.textContent.trim());

        const weightMaterialColorLines = await page.$eval('.product_info .pri_row:nth-child(3)', element => element.textContent.trim());

        const lines = weightMaterialColorLines.split('\n').map(line => line.trim());

        const weight = lines[0] || 'n/a';
        const material = lines[1] || 'n/a'; 
        let color = lines[2] || 'n/a';

        if (!color.includes("Colour")) {
          color = 'n/a';
        } 

        
        const stockLength = await page.$eval('.product_info .pri_row:nth-child(4) > .pri_stock-lengths span:nth-child(1) strong', element => element.textContent.trim()) || "n/a";
        const longestSingleLength = await page.$eval('.product_info .pri_row:nth-child(4) > .pri_stock-lengths span:nth-child(2) strong', element => element.textContent.trim()) || "n/a";

        let productMetaListArrayObject = [
          {brand}, 
          {collection}, 
          {material}, 
          {weight}, 
          {color}, 
          {stockLength}, 
          {longestSingleLength}
        ];
      
       
        var dataPayload = {title, productPrice, imageUrl, "productMeta": productMetaListArrayObject};

        
        amazonProducts.push(dataPayload);

      } catch (error) {
        console.log(error)
      }

      await page.close();
      await delay(2000) // 2 second delay


    }
  } catch (error) {
    console.error(error);
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

var newData = {"harrisons1863" : amazonProducts};

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


  await browser.close();
  console.log(amazonProducts);

})();
