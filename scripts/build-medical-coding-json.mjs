import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read extracted text
const textFile = path.join(__dirname, '..', 'extracted_medical_content', 'anatomy_part1_full_text.txt');
const fullText = fs.readFileSync(textFile, 'utf-8');

// Image positions based on page numbers (images appear after certain content on each page)
const imagePositions = {
  1: [
    { after: 'MEDICAL CODING', images: ['anatomy-page-1-image-1.png'] },
    { after: 'Ex: for diseases', images: ['anatomy-page-1-image-2.png'] }
  ],
  2: [
    { after: 'CODES: 3 TYPES', images: ['anatomy-page-2-image-1.png', 'anatomy-page-2-image-2.png'] }
  ],
  3: [
    { after: 'RCM CYCLE', images: ['anatomy-page-3-image-1.png', 'anatomy-page-3-image-2.png'] }
  ],
  5: [
    { after: 'Group of organ systems forms human body', images: ['anatomy-page-5-image-1.png'] }
  ],
  6: [
    { after: '11 ORGAN SYSTEMS', images: ['anatomy-page-6-image-1.png'] }
  ],
  7: [
    { after: 'Lymphatic system', images: ['anatomy-page-7-image-1.png'] }
  ],
  16: [
    { after: 'CAVITIES', images: ['anatomy-page-16-image-1.png'] }
  ],
  17: [
    { after: 'CRANIAL CAVITY', images: ['anatomy-page-17-image-1.png', 'anatomy-page-17-image-2.png'] }
  ],
  18: [
    { after: 'Orbital cavity', images: ['anatomy-page-18-image-1.png', 'anatomy-page-18-image-2.png', 'anatomy-page-18-image-3.png'] }
  ],
  19: [
    { after: 'DIRECTIONS', images: ['anatomy-page-19-image-1.png', 'anatomy-page-19-image-2.png'] }
  ],
  20: [
    { after: 'Extremities', images: ['anatomy-page-20-image-1.png'] }
  ]
};

// Parse pages and build content structure
function buildContentStructure() {
  const pages = fullText.split('--- PAGE ').slice(1);
  const allContent = [];
  
  pages.forEach((pageText, pageIdx) => {
    const pageNum = pageIdx + 1;
    const lines = pageText.split('\n').filter(l => l.trim());
    
    if (lines.length < 2) return;
    
    // Get page content (skip page number line)
    const contentText = lines.slice(1).join(' ').trim();
    if (!contentText) return;
    
    // Split into sentences and process
    const parts = contentText.split(/(?<=[.!?])\s+/).filter(p => p.trim());
    
    parts.forEach((part, partIdx) => {
      const trimmed = part.trim();
      if (!trimmed) return;
      
      // Check if this part should have images after it
      const imageTriggers = imagePositions[pageNum] || [];
      imageTriggers.forEach(trigger => {
        if (trimmed.includes(trigger.after)) {
          trigger.images.forEach(img => {
            allContent.push({
              type: 'image',
              src: `/tutorials/medical-coding/images/${img}`,
              alt: `Page ${pageNum} - ${img.replace('.png', '')}`
            });
          });
        }
      });
      
      // Determine if it's a heading or paragraph
      const isHeading = trimmed.length < 150 && 
                       /^[A-Z\s\d\-:()]+$/.test(trimmed) && 
                       trimmed.length > 5 &&
                       !trimmed.includes('=') &&
                       !trimmed.match(/^\d+\)/);
      
      if (isHeading) {
        allContent.push({
          type: 'heading',
          text: trimmed,
          heading_level: trimmed.length < 50 ? 2 : 3
        });
      } else {
        // Check if it's a list item
        if (trimmed.match(/^[•➢]\s/) || trimmed.match(/^\d+\)\s/)) {
          // Extract list items
          const listItems = trimmed.split(/[•➢]/).filter(i => i.trim());
          if (listItems.length > 1) {
            allContent.push({
              type: 'list',
              items: listItems.map(i => i.trim().replace(/^\d+\)\s*/, ''))
            });
          } else {
            allContent.push({
              type: 'paragraph',
              text: trimmed.replace(/^[•➢]\s*/, '').replace(/^\d+\)\s*/, ''),
              heading_level: null
            });
          }
        } else {
          allContent.push({
            type: 'paragraph',
            text: trimmed,
            heading_level: null
          });
        }
      }
    });
  });
  
  return allContent;
}

const content = buildContentStructure();

// Read existing JSON structure
const existingJsonPath = path.join(__dirname, '..', 'src', 'data', 'medical-coding-course.json');
const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf-8'));

// Update the first course section (Anatomy and Medical Terminology) with new content
if (existingData[0] && existingData[0].id === 'anatomy-medical-terminology') {
  // Replace the first section's content
  existingData[0].sections[0].content = content;
}

// Save updated JSON
fs.writeFileSync(existingJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log('✅ Updated medical-coding-course.json');
console.log(`Total content items added: ${content.length}`);


