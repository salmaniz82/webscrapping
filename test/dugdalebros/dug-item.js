import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, "dugdalebros-data.json");
let scrapingLinks = "";
let dataExist = true;


const dataItemLinks = [  
    "https://shop.dugdalebros.com//new-fine-worsted/product/8900-grey-with-blue-pin-stripe/colour/grey_with_blue_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8901-charcoal-with-red-pin-stripe/colour/charcoal_with_red_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8902-navy-with-red-pin-stripe/colour/navy_with_red_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8903-navy-with-blue-pin-stripe/colour/navy_with_blue_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8904-blue-pin-stripe/colour/blue_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8905-blue-pin-stripe/colour/blue_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8907-grey-stripe/colour/grey_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8909-grey-pin-stripe/colour/grey_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8910-charcoal-pin-stripe/colour/charcoal_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8911-navy-pin-stripe/colour/navy_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8913-black-pin-stripe/colour/black_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8914-navy-pin-stripe/colour/navy_pin_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8915-grey-chalk-stripe/colour/grey_chalk_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8916-grey-chalk-stripe/colour/grey_chalk_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8917-navy-chalk-stripe/colour/navy_chalk_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8919-black-chalk-stripe/colour/black_chalk_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8920-navy-chalk-stripe/colour/navy_chalk_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8921-black-self-stripe/colour/black_self_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8922-navy-self-stripe/colour/navy_self_stripe/page/138/",
    "https://shop.dugdalebros.com//new-fine-worsted/product/8923-black-self-stripe/colour/black_self_stripe/page/138/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3404-dug13650/colour/rcv_silver_narrow_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3405-dug13683/colour/narrow_mid_grey_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3406-dug13684/colour/narrow_dark_grey_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3407-dug13686/colour/narrow_black_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3408-dug13685/colour/narrow_light_navy_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3409-dug13687/colour/narrow_navy_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3410-dug13651/colour/rcv_blue_and_light_blue_narrow_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3411-dug13652/colour/rcv_navy_and_white_narrow_herringbone/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3412-dug13653/colour/rcv_black_and_white_twill_double_stripe/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3413-dug13654/colour/rcv_navy_and_white_twill_double_stripe/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3414-dug13655/colour/rcv_beige_and_cream_narrow_herringbone_with_light_brown_wide_stripe/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3416-dug13657/colour/rcv_navy_and_white_birdseye/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3417-dug13688/colour/navy_birdseye/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3418-dug13658/colour/rcv_midnight_and_navy_birdseye/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3419-dug13689/colour/light_grey_birdseye/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3420-dug13690/colour/dark_grey_birdseye/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3421-dug13659/colour/rcv_mid_grey_twill_with_thick_light_green_stripe/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3422-dug13660/colour/rcv_navy_twill_with_thick_pink_stripe/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3423-dug13661/colour/rcv_grey_marl_twill_with_thick_lilac_stripe/page/232/",
    "https://shop.dugdalebros.com//royal-classic-vantage/product/3426-dug13664/colour/rcv_navy_and_white_pick_and_pick_sharkskin/page/232/",
    "https://shop.dugdalebros.com//natural-elements/product/6500-white-plain/colour/white_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7301-dug1252/colour/antique_white/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6501-beige-plain/colour/beige_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7303-dug1253/colour/100_linen_buff/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6505-mid-fawn-plain/colour/mid_fawn_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6506-khaki-plain/colour/khaki_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7306-dug1254/colour/100_linen_olive/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6514-light-brown-plain/colour/light_brown_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7308-dug1255/colour/100_linen_ivy/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7309-dug1256/colour/100_linen_shergar/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7310-dug1257/colour/100_linen_oatmeal/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7311-dug1259/colour/100_linen_lt_brown/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6515-chocolate-brown-plain/colour/chocolate_brown_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7313-dug1260/colour/100_linen_orange/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6503-light-blue-plain/colour/light_blue_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6510-blue-plain/colour/blue_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/6504-corn-blue-plain/colour/corn_blue_plain/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7317-dug1261/colour/100_linen_blue/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7318-dug1262/colour/100_linen_china_blue/page/214/",
    "https://shop.dugdalebros.com//natural-elements/product/7319-dug1263/colour/100_linen_royal_blue/page/214/"
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

      const itemGridSelector = '#product';
      await page.waitForSelector(itemGridSelector);
      const itemHandle = await page.$(itemGridSelector);

      try {

        const title = await page.$eval('.titles h1 ', titleElement => titleElement.textContent.trim());
        const productPrice = "n/a";
        await page.waitForSelector('#gallery .item img');
        let productImageSrc = await page.$eval('#gallery .item img', elementimg => elementimg.getAttribute('src'));
        let imageUrl = new URL('https:' + productImageSrc).origin + new URL('https:' + productImageSrc).pathname;

        const productMetaList = await page.$$eval('.info-attributes .info-attribute span:nth-child(2)', elements => {
          return elements.map(element => element.textContent.trim());
        });

        var productMetaListArrayObject = productMetaList.map((item, index) => {
            var [key, value] = item.split(':').map(str => str.trim());
            if (index === 0) {
              value = key || '';
              key = "material"; 
                
            }
            return { [key]: value };
          });
       
        /*
        await page.waitForSelector('.eo-sh-price');
        const productPrice = await page.$eval('.eo-sh-price', priceele => priceele.textContent);
        */
        
        var dataPayload = {title, productPrice, imageUrl, "productMeta": productMetaListArrayObject};

        
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


var newData = {"dugdalebros" : amazonProducts};
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
