import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find PDF file
const medicalDir = path.join(__dirname, '..', 'public', 'downloads', 'Medical coding');
const files = fs.readdirSync(medicalDir);
const pdfFile = files.find(f => f.toLowerCase().includes('anatomy') && f.toLowerCase().endsWith('.pdf'));

const pdfPath = path.join(medicalDir, pdfFile);
const imagesDir = path.join(__dirname, '..', 'public', 'tutorials', 'medical-coding', 'images');

console.log('Extracting images from:', pdfPath);

const data = new Uint8Array(fs.readFileSync(pdfPath));

try {
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  
  console.log(`PDF loaded! Pages: ${pdf.numPages}`);
  
  let imageCount = 0;
  const imageMap = [];
  
  // Extract images from each page
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const ops = await page.getOperatorList();
    
    let pageImageCount = 0;
    
    // Extract images from operators
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const imageName = ops.argsArray[i][0];
        const image = await page.objs.get(imageName);
        
        if (image && image.data) {
          pageImageCount++;
          imageCount++;
          
          // Determine image format
          const format = image.data.length > 0 && image.data[0] === 0xFF && image.data[1] === 0xD8 ? 'jpg' : 'png';
          const filename = `anatomy-page-${pageNum}-image-${pageImageCount}.${format}`;
          const imagePath = path.join(imagesDir, filename);
          
          // Save image
          fs.writeFileSync(imagePath, image.data);
          
          imageMap.push({
            page: pageNum,
            index: pageImageCount,
            filename: filename,
            path: `/tutorials/medical-coding/images/${filename}`
          });
          
          console.log(`  Extracted: ${filename} from page ${pageNum}`);
        }
      }
    }
  }
  
  // Save image map
  const outputDir = path.join(__dirname, '..', 'extracted_medical_content');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'image_map.json'),
    JSON.stringify(imageMap, null, 2),
    'utf-8'
  );
  
  console.log(`\n✅ Extracted ${imageCount} images total`);
  console.log(`Images saved to: ${imagesDir}`);
  console.log(`Image map saved to: ${path.join(outputDir, 'image_map.json')}`);
} catch (e) {
  console.error('Error:', e.message);
  console.error(e.stack);
  process.exit(1);
}


