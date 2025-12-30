/**
 * Extract content and structure from ANATOMY AND MEDICAL TERMINOLOGY PART-1.pdf
 */

const fs = require('fs');
const path = require('path');

let PDFParse;
try {
  const pdfParseModule = require('pdf-parse');
  // In current pdf-parse versions, PDFParse is exposed as a named export on the Module object
  PDFParse = pdfParseModule.PDFParse;
  if (typeof PDFParse !== 'function') {
    throw new Error('PDFParse constructor not found on pdf-parse module');
  }
} catch (e) {
  console.error('pdf-parse not found. Installing...');
  console.error('Please run: npm install pdf-parse');
  process.exit(1);
}

async function extractPDFContent(pdfPath) {
  try {
    console.log(`Reading PDF: ${pdfPath}`);
    const dataBuffer = fs.readFileSync(pdfPath);
    // PDFParse is a class, create instance and parse
    const parser = new PDFParse(dataBuffer);
    const data = await parser.parse();
    
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
      metadata: data.metadata
    };
  } catch (error) {
    console.error('Error extracting PDF:', error.message);
    throw error;
  }
}

function parseContentToJSON(text, numPages) {
  // Split text by pages (approximate - pdf-parse doesn't give exact page breaks)
  const lines = text.split('\n').filter(line => line.trim());
  
  const content = [];
  let currentPage = 1;
  let currentSection = null;
  let currentContent = [];
  
  // Try to identify page breaks and structure
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Detect headings (all caps, short lines)
    if (line.length < 100 && /^[A-Z\s\d\-:()]+$/.test(line) && line.length > 5) {
      // Save previous section if exists
      if (currentSection && currentContent.length > 0) {
        content.push({
          page: currentPage,
          section: currentSection,
          content: currentContent.join('\n')
        });
      }
      
      currentSection = line;
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  
  // Save last section
  if (currentSection && currentContent.length > 0) {
    content.push({
      page: currentPage,
      section: currentSection,
      content: currentContent.join('\n')
    });
  }
  
  return {
    totalPages: numPages,
    sections: content,
    fullText: text
  };
}

async function main() {
  // Try to find the PDF file
  const medicalCodingDir = path.join(__dirname, '..', 'public', 'downloads', 'Medical coding');
  let pdfPath = process.argv[2];
  
  if (!pdfPath) {
    // Try to find PDF file in directory
    const files = fs.readdirSync(medicalCodingDir);
    const pdfFile = files.find(f => f.toLowerCase().includes('anatomy') && f.toLowerCase().endsWith('.pdf'));
    if (pdfFile) {
      pdfPath = path.join(medicalCodingDir, pdfFile);
    } else {
      console.error('Error: PDF file not found. Please provide path as argument.');
      console.log('Usage: node extract-medical-pdf.js <pdf_file_path>');
      process.exit(1);
    }
  }
  
  const outputDir = path.join(__dirname, '..', 'extracted_medical_content');
  
  if (!fs.existsSync(pdfPath)) {
    console.error(`Error: PDF file not found: ${pdfPath}`);
    process.exit(1);
  }
  
  console.log(`Using PDF: ${pdfPath}`);
  
  console.log('Extracting PDF content...');
  const pdfData = await extractPDFContent(pdfPath);
  
  console.log(`\nPDF Information:`);
  console.log(`  - Pages: ${pdfData.numPages}`);
  console.log(`  - Text length: ${pdfData.text.length} characters`);
  
  // Parse content
  const structured = parseContentToJSON(pdfData.text, pdfData.numPages);
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Save full text
  fs.writeFileSync(
    path.join(outputDir, 'full_text.txt'),
    pdfData.text,
    'utf-8'
  );
  
  // Save structured content
  fs.writeFileSync(
    path.join(outputDir, 'structured_content.json'),
    JSON.stringify(structured, null, 2),
    'utf-8'
  );
  
  console.log(`\nExtraction complete!`);
  console.log(`  - Full text saved to: ${path.join(outputDir, 'full_text.txt')}`);
  console.log(`  - Structured content saved to: ${path.join(outputDir, 'structured_content.json')}`);
  console.log(`  - Total sections identified: ${structured.sections.length}`);
  
  // Show preview
  console.log(`\n--- Preview of first 1000 characters ---`);
  console.log(pdfData.text.substring(0, 1000));
}

main().catch(console.error);

