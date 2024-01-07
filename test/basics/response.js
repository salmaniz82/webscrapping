import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outputDirectory = './images';

(async () => {
  let imageResponses = [];

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Enable request interception before navigating to the page
  await page.setRequestInterception(true);

  // Set up request interception
  page.on('request', (request) => {
    // Continue the intercepted request
    request.continue();
  });

  page.on('response', async (response) => {
    let contentType = response.headers()['content-type'];

    if (contentType && contentType.startsWith('image/')) {
      let url = response.url();

      imageResponses.push({ url: url, response: response });

      if (url == 'https://webential.co.uk/wp-content/uploads/2023/03/lioness-payservices.jpg') {
        console.log('file name is matched here');

        // Extract the filename from the URL
        const filename = path.basename(url);

        // Create the output directory if it doesn't exist
        if (!fs.existsSync(outputDirectory)) {
          fs.mkdirSync(outputDirectory);
        }

        // Save the response data to a file
        const filePath = path.join(outputDirectory, filename);
        const imageBuffer = await response.buffer();
        fs.writeFileSync(filePath, imageBuffer, 'binary');
        console.log('Image saved successfully:', filePath);
      }
    }
  });

  // Navigate to the page
  await page.goto('https://webential.co.uk', {
    waitUntil: 'networkidle2',
    timeout: 0,
  });

  // You can do additional tasks here

  // Close the browser after some time or when you're done with your tasks
  await browser.close();
})();
