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

if (!pdfFile) {
  console.error('PDF not found');
  process.exit(1);
}

const pdfPath = path.join(medicalDir, pdfFile);
console.log('Extracting from:', pdfPath);

const data = new Uint8Array(fs.readFileSync(pdfPath));

try {
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  
  console.log(`\n✅ PDF loaded! Pages: ${pdf.numPages}`);
  
  let fullText = '';
  const outputDir = path.join(__dirname, '..', 'extracted_medical_content');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Extract text from each page
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += `\n\n--- PAGE ${pageNum} ---\n\n${pageText}`;
    console.log(`Extracted page ${pageNum}/${pdf.numPages}`);
  }
  
  // Save extracted text
  fs.writeFileSync(
    path.join(outputDir, 'anatomy_part1_full_text.txt'),
    fullText,
    'utf-8'
  );
  
  console.log(`\n✅ Text saved to: ${path.join(outputDir, 'anatomy_part1_full_text.txt')}`);
  console.log(`Total text length: ${fullText.length} characters`);
  console.log('\n--- Preview (first 1000 characters) ---');
  console.log(fullText.substring(0, 1000));
} catch (e) {
  console.error('Error:', e.message);
  console.error(e.stack);
  process.exit(1);
}


