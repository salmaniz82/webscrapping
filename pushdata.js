
import fs from 'fs';
import path from 'path';
const folderPath = 'data';
const dataFilePath = path.join(folderPath, "lp-data.json");
import axios from 'axios';
let scrapingLinks = "";
let dataExist = true;


  try{

    let jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));


    for(var i= 0; i < jsonData.data.length; i++){

        try{

          console.log(`attempt ${i}`);

            
            var title = jsonData.data[i].title;
            var imageUrl = jsonData.data[i].imageUrl;
            var productPrice = jsonData.data[i].productPrice;
            var productMetaArrayObjects = jsonData.data[i].productMeta;
            var source = "loropiana.com";

            const productMeta = productMetaArrayObjects.reduce((result, currentObject) => {
                
                for (const [key, value] of Object.entries(currentObject)) {
                  result[key] = value;
                }
                return result;
              }, {});

            const pushPayload = {title, imageUrl, productPrice, productMeta, source};

            
            
            axios.post('http://tailormade.local/swatch', pushPayload)
            .then(response => {
            
              console.log(`saved ${i}`);
                
            })
            .catch(error => {
            
              console.log(`error ${i}`);

            });
              

        }catch(error){

            console.log('error reading index', i);

        }

        

    }



  }
  catch(error){

    console.log(error);

  }

  



  