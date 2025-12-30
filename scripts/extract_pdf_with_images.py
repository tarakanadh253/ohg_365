#!/usr/bin/env python3
"""
Script to extract content and images from PDF files for medical coding course.
"""

import json
import sys
import os
from pathlib import Path

try:
    import pdfplumber
    import fitz  # PyMuPDF
    HAS_PDF_LIBS = True
except ImportError:
    HAS_PDF_LIBS = False
    print("Installing required libraries...")
    print("Please run: pip install pdfplumber PyMuPDF")

def extract_pdf_with_images(pdf_path, output_dir):
    """Extract text and images from PDF"""
    if not HAS_PDF_LIBS:
        return None
    
    content = []
    images_dir = Path(output_dir) / "images"
    images_dir.mkdir(parents=True, exist_ok=True)
    
    # Extract images using PyMuPDF
    pdf_doc = fitz.open(pdf_path)
    image_count = 0
    
    for page_num in range(len(pdf_doc)):
        page = pdf_doc[page_num]
        
        # Extract text using pdfplumber for better formatting
        with pdfplumber.open(pdf_path) as pdf:
            page_text = pdf.pages[page_num].extract_text() if page_num < len(pdf.pages) else ""
        
        # Extract images from this page
        image_list = page.get_images(full=True)
        page_images = []
        
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = pdf_doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Save image
            image_filename = f"anatomy-page-{page_num + 1}-image-{img_index + 1}.{image_ext}"
            image_path = images_dir / image_filename
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)
            
            page_images.append({
                "filename": image_filename,
                "index": img_index + 1
            })
            image_count += 1
        
        # Store page content
        content.append({
            "page": page_num + 1,
            "text": page_text or "",
            "images": page_images
        })
    
    pdf_doc.close()
    
    return {
        "content": content,
        "total_images": image_count
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf_with_images.py <pdf_file_path> [output_dir]")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "extracted_content"
    
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    
    print(f"Extracting content and images from: {pdf_path}")
    result = extract_pdf_with_images(pdf_path, output_dir)
    
    if result:
        # Save extracted content to JSON
        output_json = Path(output_dir) / "extracted_content.json"
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        
        print(f"Extraction complete!")
        print(f"  - Total pages: {len(result['content'])}")
        print(f"  - Total images: {result['total_images']}")
        print(f"  - Content saved to: {output_json}")
        print(f"  - Images saved to: {output_dir}/images/")
    else:
        print("Error: Could not extract content. Please install required libraries:")
        print("  pip install pdfplumber PyMuPDF")
        sys.exit(1)

if __name__ == '__main__':
    main()


