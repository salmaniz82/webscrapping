
import axios from 'axios';



  

    const imageUrl = 'https://www.loropiana.com/textile/medias/3247060-665115-001704-99090-0-1200Wx1200H?context=bWFzdGVyfHJvb3R8MzE0NDI4fGltYWdlL2pwZWd8aDA5L2g1My85MzM1NzE4NTQzMzkwLmpwZ3wzMDFmOWRkMjU4ZmMyYzc2YTIxMThjOGI1Y2U2MjFjZTFiYTM4MzQ5MjA3MDczZmEyM2Y2MjJmNzNmZjMyMDNk';
   // Extract the filename from the imageUrl
 
    console.log('before making fetch request');

    try {
        axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      }).then(response => {

        console.log('got response from fetch');

        console.log(response);

      }).catch(error => {

        console.log('error in response');

        console.log(error);

      });
      
    } catch (error) {

      console.error('error while attempting fetch request');

      console.error(error.message)

    }


