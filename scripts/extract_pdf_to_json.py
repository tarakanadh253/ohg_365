#!/usr/bin/env python3
"""
Script to extract content from PDF files and convert to JSON format for medical coding course.
"""

import json
import sys
import os
from pathlib import Path

try:
    import PyPDF2
    PDF_LIB = 'PyPDF2'
except ImportError:
    try:
        import pdfplumber
        PDF_LIB = 'pdfplumber'
    except ImportError:
        PDF_LIB = None

def extract_text_pypdf2(pdf_path):
    """Extract text using PyPDF2"""
    text_content = []
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num, page in enumerate(pdf_reader.pages):
            text = page.extract_text()
            if text.strip():
                text_content.append({
                    'page': page_num + 1,
                    'text': text
                })
    return text_content

def extract_text_pdfplumber(pdf_path):
    """Extract text using pdfplumber"""
    text_content = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text()
            if text:
                text_content.append({
                    'page': page_num + 1,
                    'text': text
                })
    return text_content

def extract_pdf_content(pdf_path):
    """Extract content from PDF file"""
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found: {pdf_path}")
        return None
    
    if PDF_LIB == 'PyPDF2':
        return extract_text_pypdf2(pdf_path)
    elif PDF_LIB == 'pdfplumber':
        return extract_text_pdfplumber(pdf_path)
    else:
        print("Error: No PDF library found. Please install PyPDF2 or pdfplumber:")
        print("  pip install PyPDF2")
        print("  or")
        print("  pip install pdfplumber")
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf_to_json.py <pdf_file_path>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    print(f"Extracting content from: {pdf_path}")
    
    content = extract_pdf_content(pdf_path)
    if content:
        # Save extracted text to a JSON file
        output_path = pdf_path.replace('.pdf', '_extracted.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(content, f, indent=2, ensure_ascii=False)
        print(f"Extracted content saved to: {output_path}")
        print(f"Total pages extracted: {len(content)}")
        
        # Print first page as preview
        if content:
            print("\n--- Preview of first page ---")
            print(content[0]['text'][:500])
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()


