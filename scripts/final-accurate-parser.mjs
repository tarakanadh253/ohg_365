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

function processPageAccurately(pageContent, pageNum) {
  const content = [];
  
  // Handle page 1 specially - split at "MEDICAL CODING"
  if (pageNum === 1) {
    // Split the first sentence to insert image after "MEDICAL CODING"
    if (pageContent.includes('MEDICAL CODING')) {
      const parts = pageContent.split('MEDICAL CODING');
      if (parts.length >= 2) {
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
        
        // Add the rest of the first sentence
        const restOfFirst = parts[1].split('.')[0];
        if (restOfFirst.trim()) {
          content.push({
            type: 'paragraph',
            text: 'A BHISHEK - CPC  Medical coding is a translation or conversion of diseases or  conditions,   procedures or surgeries, and materials or supplies in to  universally accepted codes.',
            heading_level: null
          });
        }
        
        // Process remaining content
        const remaining = pageContent.substring(pageContent.indexOf('universally accepted codes') + 'universally accepted codes'.length);
        const sentences = remaining.split(/(?<=[.!?])\s+/).filter(s => s.trim());
        
        sentences.forEach((sentence) => {
          const trimmed = sentence.trim();
          if (!trimmed) return;
          
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
  const imageMap = {
    2: [
      { trigger: 'CODES: 3 TYPES', images: ['anatomy-page-2-image-1.png', 'anatomy-page-2-image-2.png'] }
    ],
    3: [
      { trigger: 'RCM CYCLE', images: ['anatomy-page-3-image-1.png', 'anatomy-page-3-image-2.png'] }
    ],
    5: [
      { trigger: 'Group of organ systems forms human body', images: ['anatomy-page-5-image-1.png'] }
    ],
    6: [
      { trigger: 'To form human body there is', images: ['anatomy-page-6-image-1.png'] }
    ],
    7: [
      { trigger: 'Lymphatic system', images: ['anatomy-page-7-image-1.png'] }
    ],
    16: [
      { trigger: 'CAVITIES', images: ['anatomy-page-16-image-1.png'] }
    ],
    17: [
      { trigger: 'CRANIAL CAVITY', images: ['anatomy-page-17-image-1.png', 'anatomy-page-17-image-2.png'] }
    ],
    18: [
      { trigger: 'Orbital cavity', images: ['anatomy-page-18-image-1.png', 'anatomy-page-18-image-2.png', 'anatomy-page-18-image-3.png'] }
    ],
    19: [
      { trigger: 'DIRECTIONS', images: ['anatomy-page-19-image-1.png', 'anatomy-page-19-image-2.png'] }
    ],
    20: [
      { trigger: 'Extremities', images: ['anatomy-page-20-image-1.png'] }
    ]
  };
  
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
  
  const pageItems = processPageAccurately(pageContent, pageNum);
  allContent = allContent.concat(pageItems);
});

// Read existing JSON
const existingJsonPath = path.join(__dirname, '..', 'src', 'data', 'medical-coding-course.json');
const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf-8'));

// Replace first section content
if (existingData[0] && existingData[0].id === 'anatomy-medical-terminology') {
  existingData[0].sections[0].content = allContent;
}

// Save
fs.writeFileSync(existingJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log('✅ Updated medical-coding-course.json');
console.log(`Total content items: ${allContent.length}`);
console.log(`Images: ${allContent.filter(c => c.type === 'image').length}`);


