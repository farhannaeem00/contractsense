import { createRequire } from 'module';
import mammoth from 'mammoth';
import path from 'path';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

export const extractText = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // ─── PDF ───────────────────────────────────────────
  if (ext === '.pdf') {
    const parser = new PDFParse({
      verbosity: 0,
      data: file.buffer,
    });

    const result = await parser.getText();
    const text = result.pages.map(p => p.text).join('\n').trim();

    if (!text || text.length < 50) {
      throw new Error('PDF appears to be empty or scanned. Please upload a text-based PDF.');
    }

    return text;
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