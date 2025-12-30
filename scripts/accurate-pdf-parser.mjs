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

function buildAccurateContent() {
  const allContent = [];
  
  pages.forEach((pageText, pageIdx) => {
    const pageNum = pageIdx + 1;
    const lines = pageText.split('\n').filter(l => l.trim());
    
    if (lines.length < 2) return;
    
    // Get page content
    let pageContent = lines.slice(1).join(' ').trim();
    if (!pageContent) return;
    
    // Image positions - more accurate triggers
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
    
    // Process content more carefully
    // Split by sentences but preserve structure
    const sentences = pageContent.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    const imageTriggers = imageMap[pageNum] || [];
    
    sentences.forEach((sentence) => {
      const trimmed = sentence.trim();
      if (!trimmed) return;
      
      // Check if this sentence contains an image trigger
      let imageInserted = false;
      imageTriggers.forEach(trigger => {
        if (trimmed.includes(trigger.trigger) && !imageInserted) {
          // Add text content
          const isHeading = trimmed.length < 150 && 
                           /^[A-Z\s\d\-:()]+$/.test(trimmed) && 
                           trimmed.length > 5 &&
                           !trimmed.includes('=') &&
                           !trimmed.match(/^\d+\)/) &&
                           !trimmed.includes('•') &&
                           !trimmed.includes('➢');
          
          if (isHeading) {
            allContent.push({
              type: 'heading',
              text: trimmed,
              heading_level: trimmed.length < 50 ? 2 : 3
            });
          } else {
            // Check for list
            if (trimmed.includes('•') || trimmed.includes('➢') || trimmed.match(/^\d+\)/)) {
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
          
          // Insert images immediately after
          trigger.images.forEach((img, imgIdx) => {
            allContent.push({
              type: 'image',
              src: `/tutorials/medical-coding/images/${img}`,
              alt: `Page ${pageNum} - Image ${imgIdx + 1}`
            });
          });
          
          imageInserted = true;
          return;
        }
      });
      
      // If no image trigger, just add content normally
      if (!imageInserted) {
        const isHeading = trimmed.length < 150 && 
                         /^[A-Z\s\d\-:()]+$/.test(trimmed) && 
                         trimmed.length > 5 &&
                         !trimmed.includes('=') &&
                         !trimmed.match(/^\d+\)/) &&
                         !trimmed.includes('•') &&
                         !trimmed.includes('➢');
        
        if (isHeading) {
          allContent.push({
            type: 'heading',
            text: trimmed,
            heading_level: trimmed.length < 50 ? 2 : 3
          });
        } else {
          // Check for list
          if (trimmed.includes('•') || trimmed.includes('➢') || trimmed.match(/^\d+\)/)) {
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
      }
    });
  });
  
  return allContent;
}

const content = buildAccurateContent();

// Read existing JSON
const existingJsonPath = path.join(__dirname, '..', 'src', 'data', 'medical-coding-course.json');
const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf-8'));

// Update first section
if (existingData[0] && existingData[0].id === 'anatomy-medical-terminology') {
  existingData[0].sections[0].content = content;
}

// Save
fs.writeFileSync(existingJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log('✅ Updated medical-coding-course.json with accurate content');
console.log(`Total content items: ${content.length}`);
console.log(`Images: ${content.filter(c => c.type === 'image').length}`);


