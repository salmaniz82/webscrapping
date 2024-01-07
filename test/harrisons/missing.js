import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const dataFilePath = path.join(folderPath, "hari-data.json");
let scrapingLinks = "";
let dataExist = true;

/*
these four are missing ids
98266
98271
28137
28379
*/

const dataItemLinks = [  
    "https://www.harrisons1863.com/product/98266/",
    "https://www.harrisons1863.com/product/98271/",
    "https://www.harrisons1863.com/product/28137/",
    "https://www.harrisons1863.com/product/28379/"
  ];
  


  let scapedDataCodes = [];
  let providedUrCodes = []


  try{

    const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

    /*
    console.log('data link', jsonData.harrisons1863.length);
    console.log('url link', dataItemLinks.length);
    */

    const codePattern = /Cloth Code ([A-Za-z0-9]+)/;

    const urlCodePattern = /\/product\/([A-Za-z0-9]+)\/$/;


    for(var i= 0; i < jsonData.harrisons1863.length; i++){

        try{
            /*
            console.log(jsonData.harrisons1863[i].title);
            */
            var code = jsonData.harrisons1863[i].title.match(codePattern);
            scapedDataCodes.push(code[1]);
        }catch(error){
            console.log('error reading index', i);
        }

    }


    dataItemLinks.forEach((item, index) => {
        var urlCode = item.match(urlCodePattern);
        providedUrCodes.push(urlCode[1]);

    });



        /*
        const missingCodes = providedUrCodes.filter(code => !scapedDataCodes.includes(code));
        console.log("Missing Codes:", missingCodes);

        const missingIndexes = providedUrCodes.reduce((indexes, code, index) => {
        if (!scapedDataCodes.includes(code)) {
        indexes.push({ index, code });
        }
            return indexes;
          }, []);

          */



          providedUrCodes.forEach((item, index) => {
            console.log(item);
    
        });







  
  

  
  


  }
  catch(error){

    console.log(error);

  }

  



  