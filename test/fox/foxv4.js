import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, 'fox-item-data.json');
let scrapingLinks = "";
let dataExist = true;


/*
const dataItemLinks = [
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-soft-grey",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-mid-grey",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-charcoal",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-classic-black",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-cricket-white",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-oatmeal",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-camel",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-light-brown",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-brown",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-char-brown",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-slate-blue",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-denim-blue",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-char-navy",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-moss-green",
    "https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-mid-green",

    "https://foxflannel.com/collections/sports-jacketing/products/sp1",
    "https://foxflannel.com/collections/sports-jacketing/products/sp2",
    "https://foxflannel.com/collections/sports-jacketing/products/sp3",
    "https://foxflannel.com/collections/sports-jacketing/products/sp4",
    "https://foxflannel.com/collections/sports-jacketing/products/sp5",
    "https://foxflannel.com/collections/sports-jacketing/products/sp6",
    "https://foxflannel.com/collections/sports-jacketing/products/sp7",
    "https://foxflannel.com/collections/sports-jacketing/products/sp8",
    "https://foxflannel.com/collections/sports-jacketing/products/sp9",
    "https://foxflannel.com/collections/sports-jacketing/products/sp10",
    "https://foxflannel.com/collections/sports-jacketing/products/sp11",
    "https://foxflannel.com/collections/sports-jacketing/products/sp12",
    "https://foxflannel.com/collections/sports-jacketing/products/sp13",
    "https://foxflannel.com/collections/sports-jacketing/products/sp14",
    "https://foxflannel.com/collections/sports-jacketing/products/sp15",

    "https://foxflannel.com/collections/vintage-fox/products/vf3",
    "https://foxflannel.com/collections/vintage-fox/products/vf4",
    "https://foxflannel.com/collections/vintage-fox/products/vf5",
    "https://foxflannel.com/collections/vintage-fox/products/vf6",
    "https://foxflannel.com/collections/vintage-fox/products/vf8",
    "https://foxflannel.com/collections/vintage-fox/products/char-brown-chalk-stripe",
    "https://foxflannel.com/collections/vintage-fox/products/vf11",
    "https://foxflannel.com/collections/vintage-fox/products/vf14",
    "https://foxflannel.com/collections/vintage-fox/products/vf15",
    "https://foxflannel.com/collections/vintage-fox/products/vf16",
    "https://foxflannel.com/collections/vintage-fox/products/prussian-blue-melange",
    "https://foxflannel.com/collections/vintage-fox/products/vf19",
    "https://foxflannel.com/collections/vintage-fox/products/vf20",
    "https://foxflannel.com/collections/vintage-fox/products/vf23",
    "https://foxflannel.com/collections/vintage-fox/products/vf27"
];
*/

const dataItemLinks = ["https://foxflannel.com/collections/new-classic-flannel-mixed-weights/products/classic-flannel-plain-soft-grey"];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });

  const amazonProducts = [];

  try {
    for (const url of dataItemLinks) {
      const page = await browser.newPage();
      const pageElement = await page.goto(url, { waitUntil: 'networkidle2' });

      const itemGridSelector = 'section.Product';
      await page.waitForSelector(itemGridSelector);
      const itemHandle = await page.$(itemGridSelector);

      try {
        const title2 = await page.$eval('h1.ProductMeta__Title.Heading', titleElement => titleElement.textContent.trim());

        const productMetaList = await page.$$eval('.ProductMeta__Text', elements => {
          return elements.map(element => element.textContent.trim());
        });

        await page.waitForSelector('.eo-sh-price');
        const productPrice = await page.$eval('.eo-sh-price', priceele => priceele.textContent);
        await page.waitForSelector('.Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected img');
        let productImageSrc = await page.$eval('.Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected img', elementimg => elementimg.getAttribute('data-original-src'));
        let imageUrl = new URL('https:' + productImageSrc).origin + new URL('https:' + productImageSrc).pathname;

        const productMetaObject = productMetaList.reduce((acc, str) => {
          const [key, value] = str.split(':');
          acc[key] = value.trim();
          return acc;
        }, {});

        let title = title2.split(':')[1].trim();

        // flatten object to array list of objects

        const productMetaArray = Object.entries(productMetaObject).map(([key, value]) => ({
          [key]: value,
        }));

        var dataPayload = {title, productPrice, imageUrl, "productMeta": productMetaArray};
        amazonProducts.push(dataPayload);

      } catch (error) {
        console.log(error)
      }

      await page.close();
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


var newData = {"foxdata" : amazonProducts};
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

  console.log(amazonProducts);
})();
