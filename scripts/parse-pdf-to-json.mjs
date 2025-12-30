import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read extracted text
const textFile = path.join(__dirname, '..', 'extracted_medical_content', 'anatomy_part1_full_text.txt');
const text = fs.readFileSync(textFile, 'utf-8');

// Image mapping based on existing images and page numbers
const imageMap = {
  1: ['anatomy-page-1-image-1.png', 'anatomy-page-1-image-2.png'],
  2: ['anatomy-page-2-image-1.png', 'anatomy-page-2-image-2.png'],
  3: ['anatomy-page-3-image-1.png', 'anatomy-page-3-image-2.png'],
  5: ['anatomy-page-5-image-1.png'],
  6: ['anatomy-page-6-image-1.png'],
  7: ['anatomy-page-7-image-1.png'],
  16: ['anatomy-page-16-image-1.png'],
  17: ['anatomy-page-17-image-1.png', 'anatomy-page-17-image-2.png'],
  18: ['anatomy-page-18-image-1.png', 'anatomy-page-18-image-2.png', 'anatomy-page-18-image-3.png'],
  19: ['anatomy-page-19-image-1.png', 'anatomy-page-19-image-2.png'],
  20: ['anatomy-page-20-image-1.png']
};

// Parse pages
const pages = text.split('--- PAGE ').slice(1); // Skip first empty part

function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();
}

function parseContentToJSON() {
  const content = [];
  let currentSection = null;
  let currentContent = [];
  let imageIndex = 0;
  
  pages.forEach((pageText, pageIdx) => {
    const pageNum = pageIdx + 1;
    const lines = pageText.split('\n').filter(l => l.trim());
    
    // Remove page header
    const contentLines = lines.slice(1);
    const pageContent = contentLines.join(' ').trim();
    
    if (!pageContent) return;
    
    // Add images for this page if they exist
    if (imageMap[pageNum]) {
      imageMap[pageNum].forEach(img => {
        currentContent.push({
          type: 'image',
          src: `/tutorials/medical-coding/images/${img}`,
          alt: `Page ${pageNum} - Image ${imageMap[pageNum].indexOf(img) + 1}`
        });
      });
    }
    
    // Parse content - detect headings and structure
    const sentences = pageContent.split(/[.!?]\s+/).filter(s => s.trim());
    
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (!trimmed) return;
      
      // Detect headings (all caps, short, or specific patterns)
      if (trimmed.length < 100 && /^[A-Z\s\d\-:()]+$/.test(trimmed) && trimmed.length > 10) {
        // Save previous content if exists
        if (currentSection && currentContent.length > 0) {
          content.push({
            type: 'heading',
            text: currentSection,
            heading_level: 2
          });
          currentContent.forEach(item => content.push(item));
          currentContent = [];
        }
        currentSection = trimmed;
      } else {
        // Regular paragraph
        currentContent.push({
          type: 'paragraph',
          text: trimmed,
          heading_level: null
        });
      }
    });
  });
  
  // Save last section
  if (currentSection && currentContent.length > 0) {
    content.push({
      type: 'heading',
      text: currentSection,
      heading_level: 2
    });
    currentContent.forEach(item => content.push(item));
  }
  
  return content;
}

// Generate structured JSON
const structuredContent = parseContentToJSON();

// Save to file for review
const outputFile = path.join(__dirname, '..', 'extracted_medical_content', 'parsed_content.json');
fs.writeFileSync(outputFile, JSON.stringify(structuredContent, null, 2), 'utf-8');

console.log('✅ Parsed content saved to:', outputFile);
console.log('Total content items:', structuredContent.length);


