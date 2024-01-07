import fs from 'fs';
import path from 'path';
import axios from 'axios';

const jsonFilePath = 'data/lp-data.json';
const outputDirectory = 'images/lp-images';

// Read the JSON file
try {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Iterate over each object in the foxdata array
  jsonData.data_a.forEach(async (item, index) => {
    const imageUrl = item.imageUrl;

   // Extract the filename from the imageUrl
    const fileName = path.basename(new URL(imageUrl).pathname);


    // Construct the local file path
    const localFilePath = path.join(outputDirectory, fileName);

    // Download the image and save it locally
    try {
      const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      // Pipe the image stream to a file
      response.data.pipe(fs.createWriteStream(localFilePath));

      console.log(`Image ${index + 1} saved locally as ${localFilePath}`);
    } catch (error) {
      console.error(`Error downloading image ${index + 1}:`, error.message);
    }
  });
} catch (error) {
  console.error('Error reading JSON file:', error.message);
}
