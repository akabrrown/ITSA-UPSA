const sharp = require('sharp');
const path = require('path');

async function trimImage() {
  try {
    const inputPath = path.join(__dirname, 'public', 'Vyp1f802_400x400.jpg');
    const outputPath = path.join(__dirname, 'public', 'logo.png');

    await sharp(inputPath)
      .trim() // automatically removes the background color from the edges
      .png()  // convert to PNG for transparency support if needed
      .toFile(outputPath);
      
    console.log('Successfully trimmed logo and saved to public/logo.png');
  } catch (error) {
    console.error('Error trimming image:', error);
  }
}

trimImage();
