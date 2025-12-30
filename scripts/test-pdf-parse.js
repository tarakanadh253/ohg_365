import('pdf-parse').then(async (pdfModule) => {
  const fs = await import('fs');
  const path = await import('path');
  
  const pdf = pdfModule.default || pdfModule;

  // Find PDF file
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const medicalDir = path.join(__dirname, '..', 'public', 'downloads', 'Medical coding');
  const files = fs.readdirSync(medicalDir);
  const pdfFile = files.find(f => f.toLowerCase().includes('anatomy') && f.toLowerCase().endsWith('.pdf'));

  if (!pdfFile) {
    console.error('PDF not found');
    process.exit(1);
  }

  const pdfPath = path.join(medicalDir, pdfFile);
  console.log('Testing with:', pdfPath);

  const buffer = fs.readFileSync(pdfPath);

  // Try different ways to use pdf-parse
  console.log('\n1. Trying as function:');
  try {
    const data = await pdf(buffer);
    console.log('SUCCESS! Pages:', data.numpages, 'Text length:', data.text.length);
    console.log('First 500 chars:', data.text.substring(0, 500));
  } catch (e) {
    console.log('Failed:', e.message);
    
    console.log('\n2. Trying with new:');
    try {
      const parser = new pdf.PDFParse(buffer);
      const data = await parser.parse();
      console.log('SUCCESS with new!');
    } catch (e2) {
      console.log('Failed:', e2.message);
    }
  }
}).catch(console.error);

