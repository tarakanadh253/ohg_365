import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read extracted text
const textFile = path.join(__dirname, '..', 'extracted_medical_content', 'anatomy_part1_full_text.txt');
const fullText = fs.readFileSync(textFile, 'utf-8');

// Parse pages
const pages = fullText.split('--- PAGE ').slice(1);

// Image positions - based on where they appear in the PDF
// Format: { page: number, position: 'before'|'after', trigger: string, images: [string] }
const imagePositions = [
  { page: 1, position: 'after', trigger: 'MEDICAL CODING', images: ['anatomy-page-1-image-1.png'] },
  { page: 1, position: 'after', trigger: 'Ex: for diseases', images: ['anatomy-page-1-image-2.png'] },
  { page: 2, position: 'after', trigger: 'CODES: 3 TYPES', images: ['anatomy-page-2-image-1.png', 'anatomy-page-2-image-2.png'] },
  { page: 3, position: 'after', trigger: 'RCM CYCLE', images: ['anatomy-page-3-image-1.png', 'anatomy-page-3-image-2.png'] },
  { page: 5, position: 'after', trigger: 'Group of organ systems forms human body', images: ['anatomy-page-5-image-1.png'] },
  { page: 6, position: 'after', trigger: '11 ORGAN SYSTEMS', images: ['anatomy-page-6-image-1.png'] },
  { page: 7, position: 'after', trigger: 'Lymphatic system', images: ['anatomy-page-7-image-1.png'] },
  { page: 16, position: 'after', trigger: 'CAVITIES', images: ['anatomy-page-16-image-1.png'] },
  { page: 17, position: 'after', trigger: 'CRANIAL CAVITY', images: ['anatomy-page-17-image-1.png', 'anatomy-page-17-image-2.png'] },
  { page: 18, position: 'after', trigger: 'Orbital cavity', images: ['anatomy-page-18-image-1.png', 'anatomy-page-18-image-2.png', 'anatomy-page-18-image-3.png'] },
  { page: 19, position: 'after', trigger: 'DIRECTIONS', images: ['anatomy-page-19-image-1.png', 'anatomy-page-19-image-2.png'] },
  { page: 20, position: 'after', trigger: 'Extremities', images: ['anatomy-page-20-image-1.png'] }
];

function parsePageContent(pageText, pageNum) {
  const content = [];
  const lines = pageText.split('\n').filter(l => l.trim());
  
  if (lines.length < 2) return content;
  
  // Get content (skip page number line)
  const pageContent = lines.slice(1).join(' ').trim();
  if (!pageContent) return content;
  
  // Split into logical chunks (sentences, headings, etc.)
  // First, handle special patterns like tables and lists
  const chunks = [];
  let currentChunk = '';
  
  // Split by periods but keep context
  const sentences = pageContent.split(/(?<=[.!?])\s+/);
  
  sentences.forEach((sentence, idx) => {
    const trimmed = sentence.trim();
    if (!trimmed) return;
    
    // Check for image triggers
    const pageImages = imagePositions.filter(img => img.page === pageNum);
    pageImages.forEach(imgTrigger => {
      if (trimmed.includes(imgTrigger.trigger)) {
        if (imgTrigger.position === 'after') {
          chunks.push({ type: 'text', content: trimmed });
          imgTrigger.images.forEach(img => {
            chunks.push({ 
              type: 'image', 
              src: `/tutorials/medical-coding/images/${img}`,
              alt: `Page ${pageNum} - ${img.replace('.png', '').replace('anatomy-page-', '')}`
            });
          });
          return;
        }
      }
    });
    
    // If not handled by image trigger, add as text
    if (!chunks.some(c => c.type === 'text' && c.content === trimmed)) {
      chunks.push({ type: 'text', content: trimmed });
    }
  });
  
  // Convert chunks to JSON format
  chunks.forEach(chunk => {
    if (chunk.type === 'image') {
      content.push({
        type: 'image',
        src: chunk.src,
        alt: chunk.alt
      });
    } else {
      const text = chunk.content;
      
      // Detect headings (all caps, short, no special chars)
      const isHeading = text.length < 150 && 
                       /^[A-Z\s\d\-:()]+$/.test(text) && 
                       text.length > 5 &&
                       !text.includes('=') &&
                       !text.match(/^\d+\)/) &&
                       !text.includes('•') &&
                       !text.includes('➢');
      
      if (isHeading) {
        content.push({
          type: 'heading',
          text: text,
          heading_level: text.length < 50 ? 2 : 3
        });
      } else {
        // Check for list items
        if (text.includes('•') || text.includes('➢') || text.match(/^\d+\)/)) {
          const listItems = text.split(/[•➢]/).filter(i => i.trim());
          if (listItems.length > 1) {
            content.push({
              type: 'list',
              items: listItems.map(i => i.trim().replace(/^\d+\)\s*/, ''))
            });
          } else {
            // Single list item as paragraph
            content.push({
              type: 'paragraph',
              text: text.replace(/^[•➢]\s*/, '').replace(/^\d+\)\s*/, ''),
              heading_level: null
            });
          }
        } else {
          content.push({
            type: 'paragraph',
            text: text,
            heading_level: null
          });
        }
      }
    }
  });
  
  return content;
}

// Build complete content structure
let allContent = [];

pages.forEach((pageText, pageIdx) => {
  const pageNum = pageIdx + 1;
  const pageContent = parsePageContent(pageText, pageNum);
  allContent = allContent.concat(pageContent);
});

// Read existing JSON
const existingJsonPath = path.join(__dirname, '..', 'src', 'data', 'medical-coding-course.json');
const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf-8'));

// Update the first section with complete content from PDF
if (existingData[0] && existingData[0].id === 'anatomy-medical-terminology') {
  existingData[0].sections[0].content = allContent;
}

// Save
fs.writeFileSync(existingJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log('✅ Updated medical-coding-course.json with PDF content');
console.log(`Total content items: ${allContent.length}`);
console.log(`Images included: ${allContent.filter(c => c.type === 'image').length}`);


