import Contract from '../models/Contract.js';
import { extractText } from '../services/extractText.js';
import { analyzeContract } from '../services/analyzeContract.js';
import { processDeadlines } from '../services/processDeadlines.js';

// ─── POST /api/contracts/ ────────────────────────────
export const uploadContract = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // 1. Save contract immediately with "analyzing" status
  const contract = await Contract.create({
    userId:   req.user._id,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    status:   'analyzing',
  });

  // 2. Respond instantly — don't make user wait for AI
  res.status(202).json({
    success:    true,
    contractId: contract._id,
    status:     'analyzing',
    message:    'Contract uploaded. Analysis started.',
  });

  // 3. Process everything in background after response is sent
  processContract(contract._id, req.file);
};

// ─── Background Processing Function ─────────────────
const processContract = async (contractId, file) => {
  try {
    console.log(`⏳ Processing contract ${contractId}...`);

    // Step 1: Extract raw text from PDF or DOCX
    console.log('📄 Extracting text...');
    const rawText = await extractText(file);

    // Save raw text immediately in case AI fails
    await Contract.findByIdAndUpdate(contractId, { rawText });

    // Step 2: Send text to Groq AI for analysis
    console.log('🤖 Sending to AI for analysis...');
    const analysis = await analyzeContract(rawText);

    // Step 3: Process deadlines — calculate days remaining
    console.log('📅 Processing deadlines...');
    const deadlines = processDeadlines(analysis.deadlines);

    // Step 4: Save full analysis to MongoDB
    await Contract.findByIdAndUpdate(contractId, {
      status:    'done',
      riskScore: analysis.riskScore,
      summary:   analysis.summary,
      clauses:   analysis.clauses,
      deadlines,
    });

    console.log(`✅ Contract ${contractId} analyzed successfully`);

  } catch (error) {
    // If anything fails, mark contract as error
    await Contract.findByIdAndUpdate(contractId, {
      status:       'error',
      errorMessage: error.message,
    });
    console.error(`❌ Contract ${contractId} failed:`, error.message);
  }
};

// ─── GET /api/contracts/ ─────────────────────────────
export const getContracts = async (req, res) => {
  const contracts = await Contract.find({ userId: req.user._id })
    .select('-rawText -clauses') // exclude heavy fields in list view
    .sort({ createdAt: -1 });   // newest first

  res.status(200).json({
    success: true,
    count:   contracts.length,
    data:    contracts,
  });
};

// ─── GET /api/contracts/:id ──────────────────────────
export const getContract = async (req, res) => {
  const contract = await Contract.findOne({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!contract) {
    return res.status(404).json({ message: 'Contract not found' });
  }

  res.status(200).json({
    success: true,
    data:    contract,
  });
};

// ─── DELETE /api/contracts/:id ───────────────────────
export const deleteContract = async (req, res) => {
  const contract = await Contract.findOneAndDelete({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!contract) {
    return res.status(404).json({ message: 'Contract not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Contract deleted successfully',
  });
};