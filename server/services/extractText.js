const path    = require('path');
const mammoth = require('mammoth');

const extractText = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // ─── PDF ───────────────────────────────────────────
  if (ext === '.pdf') {
    try {
      // Method 1: Try PDFParse class
      const pdfParseModule = require('pdf-parse');
      const PDFParse = pdfParseModule.PDFParse;

      if (PDFParse && typeof PDFParse === 'function') {
        const parser = new PDFParse({ verbosity: 0, data: file.buffer });
        const result = await parser.getText();
        const text   = result.pages.map(p => p.text).join('\n').trim();

        if (text && text.length >= 50) return text;
      }

      // Method 2: Try default function export
      const pdfParse = pdfParseModule.default || pdfParseModule;
      if (typeof pdfParse === 'function') {
        const result = await pdfParse(file.buffer);
        const text   = result.text?.trim();

        if (text && text.length >= 50) return text;
      }

      throw new Error('Could not extract text from PDF');

    } catch (err) {
      throw new Error(`PDF extraction failed: ${err.message}`);
    }
  }

  // ─── DOCX / DOC ────────────────────────────────────
  if (ext === '.docx' || ext === '.doc') {
    const result = await mammoth.extractRawText({ buffer: file.buffer });

    if (!result.value || result.value.trim().length < 50) {
      throw new Error('Document appears to be empty. Please check your file.');
    }

    return result.value.trim();
  }

  // ─── Unsupported ───────────────────────────────────
  throw new Error('Unsupported file type. Only PDF and DOCX are allowed.');
};

module.exports = { extractText };