import fs from 'fs';
import path from 'path';



const directoryPath = 'images/lp-images/'; // Replace with your actual directory path

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    
    // Check if it's a file (not a directory)
    if (fs.statSync(filePath).isFile()) {
      // Check if the file has an extension
      if (path.extname(file) === '') {
        // If no extension, rename the file with ".jpeg" extension
        const newFileName = file + '.jpeg';
        const newFilePath = path.join(directoryPath, newFileName);

        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed: ${file} -> ${newFileName}`);
      }
    }
  });
});