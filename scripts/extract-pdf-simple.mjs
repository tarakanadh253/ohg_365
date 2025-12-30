import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use dynamic import for pdf-parse and its PDFParse class API
const pdfModule = await import('pdf-parse');
const { PDFParse } = pdfModule;

if (typeof PDFParse !== 'function') {
  console.error('Unable to load pdf-parse. Expected PDFParse class export.');
  process.exit(1);
}

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

const buffer = fs.readFileSync(pdfPath);

try {
  // New pdf-parse API: instantiate PDFParse with options, then call getText()
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();

  console.log('\n✅ SUCCESS!');
  console.log(`Pages: ${result.total}`);
  console.log(`Total text length: ${result.text.length} characters`);

  // Build a page-marked text file like: --- PAGE 1 ---\n<page text>\n\n
  let combinedText = '';
  for (const page of result.pages) {
    combinedText += `--- PAGE ${page.num} ---\n${page.text}\n\n`;
  }

  // Save extracted text
  const outputDir = path.join(__dirname, '..', 'extracted_medical_content');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outPath = path.join(outputDir, 'anatomy_part1_full_text.txt');
  fs.writeFileSync(outPath, combinedText, 'utf-8');

  console.log(`\nText with page markers saved to: ${outPath}`);
  console.log('\n--- Preview (first 1000 characters) ---');
  console.log(combinedText.substring(0, 1000));
} catch (e) {
  console.error('Error while extracting PDF text:', e);
  process.exit(1);
}

