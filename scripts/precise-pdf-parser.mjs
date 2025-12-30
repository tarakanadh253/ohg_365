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

function processPagePrecisely(pageContent, pageNum) {
  const content = [];
  
  // Image insertion points - more precise
  const imageMap = {
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
      { after: 'To form human body there is', images: ['anatomy-page-6-image-1.png'] }
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
  
  // For page 1, handle special case - split at "MEDICAL CODING"
  if (pageNum === 1) {
    if (pageContent.includes('MEDICAL CODING')) {
      const parts = pageContent.split('MEDICAL CODING');
      if (parts.length > 1) {
        // Add "MEDICAL CODING" as heading
        content.push({
          type: 'heading',
          text: 'MEDICAL CODING',
          heading_level: 1
        });
        
        // Insert first image
        content.push({
          type: 'image',
          src: '/tutorials/medical-coding/images/anatomy-page-1-image-1.png',
          alt: 'Medical Coding Overview'
        });
        
        // Add rest of content
        const rest = 'MEDICAL CODING' + parts[1];
        const sentences = rest.split(/(?<=[.!?])\s+/).filter(s => s.trim());
        
        sentences.forEach((sentence, idx) => {
          const trimmed = sentence.trim();
          if (!trimmed) return;
          
          // Skip if it's just "MEDICAL CODING" (already added)
          if (trimmed === 'MEDICAL CODING') return;
          
          // Check for second image trigger
          if (trimmed.includes('Ex: for diseases')) {
            content.push({
              type: 'paragraph',
              text: trimmed,
              heading_level: null
            });
            content.push({
              type: 'image',
              src: '/tutorials/medical-coding/images/anatomy-page-1-image-2.png',
              alt: 'Examples of Diseases'
            });
          } else {
            const isHeading = trimmed.length < 150 && 
                             /^[A-Z\s\d\-:()]+$/.test(trimmed) && 
                             trimmed.length > 5 &&
                             !trimmed.includes('=') &&
                             !trimmed.match(/^\d+\)/) &&
                             !trimmed.includes('•') &&
                             !trimmed.includes('➢');
            
            if (isHeading) {
              content.push({
                type: 'heading',
                text: trimmed,
                heading_level: trimmed.length < 50 ? 2 : 3
              });
            } else if (trimmed.includes('•') || trimmed.includes('➢') || trimmed.match(/^\d+\)/)) {
              const listItems = trimmed.split(/[•➢]/).filter(i => i.trim());
              if (listItems.length > 1) {
                content.push({
                  type: 'list',
                  items: listItems.map(i => i.trim().replace(/^\d+\)\s*/, ''))
                });
              } else {
                content.push({
                  type: 'paragraph',
                  text: trimmed.replace(/^[•➢]\s*/, '').replace(/^\d+\)\s*/, ''),
                  heading_level: null
                });
              }
            } else {
              content.push({
                type: 'paragraph',
                text: trimmed,
                heading_level: null
              });
            }
          }
        });
        
        return content;
      }
    }
  }
  
  // For other pages, process normally
  const sentences = pageContent.split(/(?<=[.!?])\s+/).filter(s => s.trim());
  const imageTriggers = imageMap[pageNum] || [];
  
  sentences.forEach((sentence) => {
    const trimmed = sentence.trim();
    if (!trimmed) return;
    
    // Check for image triggers
    let imagesToInsert = [];
    imageTriggers.forEach(trigger => {
      if (trimmed.includes(trigger.trigger)) {
        imagesToInsert = trigger.images;
      }
    });
    
    // Determine content type
    const isHeading = trimmed.length < 150 && 
                     /^[A-Z\s\d\-:()]+$/.test(trimmed) && 
                     trimmed.length > 5 &&
                     !trimmed.includes('=') &&
                     !trimmed.match(/^\d+\)/) &&
                     !trimmed.includes('•') &&
                     !trimmed.includes('➢');
    
    // Add content
    if (isHeading) {
      content.push({
        type: 'heading',
        text: trimmed,
        heading_level: trimmed.length < 50 ? 2 : 3
      });
    } else if (trimmed.includes('•') || trimmed.includes('➢') || trimmed.match(/^\d+\)/)) {
      const listItems = trimmed.split(/[•➢]/).filter(i => i.trim());
      if (listItems.length > 1) {
        content.push({
          type: 'list',
          items: listItems.map(i => i.trim().replace(/^\d+\)\s*/, ''))
        });
      } else {
        content.push({
          type: 'paragraph',
          text: trimmed.replace(/^[•➢]\s*/, '').replace(/^\d+\)\s*/, ''),
          heading_level: null
        });
      }
    } else {
      content.push({
        type: 'paragraph',
        text: trimmed,
        heading_level: null
      });
    }
    
    // Insert images if triggered
    if (imagesToInsert.length > 0) {
      imagesToInsert.forEach((img, idx) => {
        content.push({
          type: 'image',
          src: `/tutorials/medical-coding/images/${img}`,
          alt: `Page ${pageNum} - Image ${idx + 1}`
        });
      });
    }
  });
  
  return content;
}

// Build complete content
let allContent = [];

pages.forEach((pageText, pageIdx) => {
  const pageNum = pageIdx + 1;
  const lines = pageText.split('\n').filter(l => l.trim());
  
  if (lines.length < 2) return;
  
  const pageContent = lines.slice(1).join(' ').trim();
  if (!pageContent) return;
  
  const pageItems = processPagePrecisely(pageContent, pageNum);
  allContent = allContent.concat(pageItems);
});

// Read existing JSON
const existingJsonPath = path.join(__dirname, '..', 'src', 'data', 'medical-coding-course.json');
const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf-8'));

// Replace first section content completely
if (existingData[0] && existingData[0].id === 'anatomy-medical-terminology') {
  existingData[0].sections[0].content = allContent;
}

// Save
fs.writeFileSync(existingJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log('✅ Updated medical-coding-course.json with precise content');
console.log(`Total content items: ${allContent.length}`);
console.log(`Images: ${allContent.filter(c => c.type === 'image').length}`);


