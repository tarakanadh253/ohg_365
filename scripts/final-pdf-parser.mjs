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

function buildContentWithImages() {
  const allContent = [];
  
  pages.forEach((pageText, pageIdx) => {
    const pageNum = pageIdx + 1;
    const lines = pageText.split('\n').filter(l => l.trim());
    
    if (lines.length < 2) return;
    
    // Get page content
    let pageContent = lines.slice(1).join(' ').trim();
    if (!pageContent) return;
    
    // Image positions for each page - based on content triggers
    const pageImageMap = {
      1: [
        { trigger: 'MEDICAL CODING', position: 'after', images: ['anatomy-page-1-image-1.png'] },
        { trigger: 'Ex: for diseases', position: 'after', images: ['anatomy-page-1-image-2.png'] }
      ],
      2: [
        { trigger: 'CODES: 3 TYPES', position: 'after', images: ['anatomy-page-2-image-1.png', 'anatomy-page-2-image-2.png'] }
      ],
      3: [
        { trigger: 'RCM CYCLE', position: 'after', images: ['anatomy-page-3-image-1.png', 'anatomy-page-3-image-2.png'] }
      ],
      5: [
        { trigger: 'Group of organ systems forms human body', position: 'after', images: ['anatomy-page-5-image-1.png'] }
      ],
      6: [
        { trigger: 'To form human body there is', position: 'after', images: ['anatomy-page-6-image-1.png'] }
      ],
      7: [
        { trigger: 'Lymphatic system', position: 'after', images: ['anatomy-page-7-image-1.png'] }
      ],
      16: [
        { trigger: 'CAVITIES', position: 'after', images: ['anatomy-page-16-image-1.png'] }
      ],
      17: [
        { trigger: 'CRANIAL CAVITY', position: 'after', images: ['anatomy-page-17-image-1.png', 'anatomy-page-17-image-2.png'] }
      ],
      18: [
        { trigger: 'Orbital cavity', position: 'after', images: ['anatomy-page-18-image-1.png', 'anatomy-page-18-image-2.png', 'anatomy-page-18-image-3.png'] }
      ],
      19: [
        { trigger: 'DIRECTIONS', position: 'after', images: ['anatomy-page-19-image-1.png', 'anatomy-page-19-image-2.png'] }
      ],
      20: [
        { trigger: 'Extremities', position: 'after', images: ['anatomy-page-20-image-1.png'] }
      ]
    };
    
    // Split into sentences
    const sentences = pageContent.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    const imageTriggers = pageImageMap[pageNum] || [];
    
    sentences.forEach((sentence, sentIdx) => {
      const trimmed = sentence.trim();
      if (!trimmed) return;
      
      // Add the text content first
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
      
      // Check if images should be inserted after this sentence
      imageTriggers.forEach(trigger => {
        if (trimmed.includes(trigger.trigger)) {
          trigger.images.forEach((img, imgIdx) => {
            allContent.push({
              type: 'image',
              src: `/tutorials/medical-coding/images/${img}`,
              alt: `Page ${pageNum} - Image ${imgIdx + 1}`
            });
          });
        }
      });
    });
  });
  
  return allContent;
}

const content = buildContentWithImages();

// Read existing JSON
const existingJsonPath = path.join(__dirname, '..', 'src', 'data', 'medical-coding-course.json');
const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf-8'));

// Update first section
if (existingData[0] && existingData[0].id === 'anatomy-medical-terminology') {
  existingData[0].sections[0].content = content;
}

// Save
fs.writeFileSync(existingJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log('✅ Updated medical-coding-course.json');
console.log(`Total content items: ${content.length}`);
console.log(`Images: ${content.filter(c => c.type === 'image').length}`);


