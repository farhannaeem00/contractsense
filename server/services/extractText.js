const path    = require('path');
const mammoth = require('mammoth');
const { PDFParse } = require('pdf-parse');

const extractText = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === '.pdf') {
    const parser = new PDFParse({ verbosity: 0, data: file.buffer });
    const result = await parser.getText();
    const text   = result.pages.map(p => p.text).join('\n').trim();

    if (!text || text.length < 50)
      throw new Error('PDF appears to be empty or scanned.');
    return text;
  }

  if (ext === '.docx' || ext === '.doc') {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    if (!result.value || result.value.trim().length < 50)
      throw new Error('Document appears to be empty.');
    return result.value.trim();
  }

  throw new Error('Unsupported file type. Only PDF and DOCX are allowed.');
};

module.exports = { extractText };