/**
 * Script to extract content and images from PDF files
 * Requires: npm install pdf-parse pdf-lib canvas
 */

const fs = require('fs');
const path = require('path');

async function extractPDFContent(pdfPath) {
  try {
    // Try to use pdf-parse if available
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info
    };
  } catch (error) {
    console.error('Error extracting PDF:', error.message);
    console.log('\nPlease install required package:');
    console.log('  npm install pdf-parse');
    return null;
  }
}

async function main() {
  const pdfPath = process.argv[2];
  const outputDir = process.argv[3] || 'extracted_content';
  
  if (!pdfPath) {
    console.log('Usage: node extract-pdf.js <pdf_file_path> [output_dir]');
    process.exit(1);
  }
  
  if (!fs.existsSync(pdfPath)) {
    console.error(`Error: PDF file not found: ${pdfPath}`);
    process.exit(1);
  }
  
  console.log(`Extracting content from: ${pdfPath}`);
  const result = await extractPDFContent(pdfPath);
  
  if (result) {
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save extracted text
    const outputFile = path.join(outputDir, 'extracted_text.txt');
    fs.writeFileSync(outputFile, result.text, 'utf-8');
    
    console.log(`\nExtraction complete!`);
    console.log(`  - Total pages: ${result.numPages}`);
    console.log(`  - Text saved to: ${outputFile}`);
    console.log(`\nNote: For image extraction, please use Python with PyMuPDF:`);
    console.log(`  pip install PyMuPDF`);
    console.log(`  python scripts/extract_pdf_with_images.py "${pdfPath}"`);
  }
}

main().catch(console.error);


