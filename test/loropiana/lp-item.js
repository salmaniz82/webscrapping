import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const filePath = path.join(folderPath, "lp-data.json");
let scrapingLinks = "";
let dataExist = true;

const delay = ms => new Promise(res => setTimeout(res, ms));

const dataItemLinks = [  

  "https://www.loropiana.com/textile/fabrics/p/30077228669600010/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/70073500165400001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/70073500165400003/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/70073500165400004/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00369202065400001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00369202065400002/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00369202065400003/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30107500165400010/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30107500165400011/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30107500165400014/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00469900165400004/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00469900165400015/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00469900165400037/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/36990200265410114/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/36990100265400059/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/36990100265400306/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/36990100265400307/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644800165400001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00666800165400003/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30128900165400001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30128900165400002/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30105100265400002/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30105100265400003/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30105100265400006/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30105100265400009/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/30105100265400012/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644408765400001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644408765400002/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644408765400003/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644408765400004/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644400165400073/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644400165400102/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00644400165400111/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00367900165400048/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00367900165400074/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00367900165400101/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46790100165400059/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46790100165400102/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46790100165400306/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46680100165400059/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46680100165400306/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46680100165400307/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/00366882265400114/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/46680200165400102/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270603GRP002716S2202500GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270603GRP002716S2218242GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270601DA00171600059DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270601DA00171600239DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006636GQ0317160021300/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270601GQ0017160023900/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270601GQ0017160005900/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/270602GQ0017160010300/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006636GQ0317160010700/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856DA00171600115DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856DA00171600233DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856GRP001716S2200348GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856GRP001716S2200694GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856GQ0017160017600/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856GQ0017160063300/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856F00171600012F001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856F00171600659F026/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/006856F00171600276F020/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/054249GQ0017160000900/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/054249GQ0017160000400/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/054249GQ0017160000100/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901F00271602427F027/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901F00271600367F028/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901DA00271600059DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901DA00271600367DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901GRP002716S2202469GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901GRP002716S2220740GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901GQ0027160036700/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901GQ0027160671100/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/052592GQ0017160005000/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/827901FD00271620746FD001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/301669DA00171600001DA01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/301949GRP002716S2200001GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573GQ0127160003200/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573GQ0127160002200/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573GQ0127160001200/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573GQ0127160001000/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573F01271600030F032/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573F01271600018F019/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/053573F01271600011F001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/518903RS00171621473/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/518903RS00171620381/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/518903RS00171616823/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009GQ0017160008400/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009GQ0017160010300/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009GQ0017160012500/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009GQ0017160006300/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009RS00171600062/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009RS00171600073/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009RS00171600067/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009RS00171600005/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009F00171600005F036/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009F00171600009F028/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/511009F00171600067F027/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055215GRP001716S2230736GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055215GRP001716S2231604GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055215GRP001716S2231888GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055215GRP001716S2231251GRP01/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153RS00171615300/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153RS00171618584/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153RS00171600059/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153RS00171630193/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153RS00171621089/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153F00171619927F034/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153F00171615300F021/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/055153FD00171617459FD001/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/332501GQ0017160023900/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/332501GQ0017161323800/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/332501GQ0017161939100/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/700994GQ0017160010900/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/700994GQ0017160000500/02-00031-00030-00001",
  "https://www.loropiana.com/textile/fabrics/p/700994GQ0017160032700/02-00031-00030-00001"

];

  

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'
  });

  const amazonProducts = [];

  let counter = 0;

  try {
    for (let url of dataItemLinks) {

      console.log('item', ++counter);

        url = url.replace(/:(?=\/)/, ":").replace(/\/\//g, "/");

      const page = await browser.newPage();
      
      const pageElement = await page.goto(url, { waitUntil: 'networkidle2' });

      const itemGridSelector = '.product-details-panel';
      await page.waitForSelector(itemGridSelector);
      const itemHandle = await page.$(itemGridSelector);

      try {

        let productMeta = [];
        let title = "";
        let imageUrl = "";
        let style = "";
        let size = "";
        let bunch = "";
        let productPrice = "n/a";

        title = await page.$eval('.product-details > .name > h2', titleElement => titleElement.textContent.trim());
        
        await page.waitForSelector('.zoomWindowContainer > div');
        let productImageStyleElement = await page.$eval('.zoomWindowContainer > div', elementimg => elementimg.getAttribute('style'));

        imageUrl = productImageStyleElement.match(/url\(['"]?(.*?)['"]?\)/)[1];
        imageUrl = imageUrl.replace(/^&quot;|&quot;$/g, '');

        imageUrl = 'https://www.loropiana.com'+imageUrl;

        style = await page.$eval('.skuPriceWrapper.cf span > span:nth-child(2)', titleElement => titleElement.textContent.trim());
        size = await page.$eval('.skuPriceWrapper.cf span > span:nth-child(5)', titleElement => titleElement.textContent.trim());
        bunch = await page.$eval('.sectionProductFullDescription > b', titleElement => titleElement.textContent.trim());


        
        productMeta = await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll('.pdp-desktop .sectionProductInfo .product-classifications tbody tr')).slice(0, -1); 
          const data = [];
      
          for (let i = 0; i < rows.length; i++) {

         
            
            const keyElement = rows[i].querySelector('.attrib');
            const valueElement = rows[i].querySelector('td:not(.attrib)');
            
            if (keyElement && valueElement) {
              let key = keyElement.textContent.trim().replace(/\t|\n/g, '');
              let value = valueElement.textContent.trim().replace(/\t|\n/g, '');

              console.log(({ [key]: value }));

              data.push({ [key]: value });
            }
            
          }

          return data;
        });

        
        

        productMeta.push({style}, {size}, {bunch});


        const filteredObjectMeta = productMeta.filter(obj => {
          const hasEmptyKey = Object.keys(obj).some(key => key === '' || obj[key] === '');
          return !hasEmptyKey;
        });

        
        var dataPayload = {title, productPrice, imageUrl, "productMeta": filteredObjectMeta};

        
        amazonProducts.push(dataPayload);

      } catch (error) {
        console.log(error)
      }

      await page.close();
      await delay(10) // 2 second delay


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

var newData = {"data" : amazonProducts};

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
  

})();
