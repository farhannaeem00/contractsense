const Contract = require('../models/Contract');
const { extractText }      = require('../services/extractText');
const { analyzeContract }  = require('../services/analyzeContract');
const { processDeadlines } = require('../services/processDeadlines');

const uploadContract = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: 'No file uploaded' });

  const contract = await Contract.create({
    userId:   req.user._id,
    fileName: req.file.originalname,
    fileSize: req.file.size,
    status:   'analyzing',
  });

  res.status(202).json({
    success:    true,
    contractId: contract._id,
    status:     'analyzing',
    message:    'Contract uploaded. Analysis started.',
  });

  processContract(contract._id, req.file);
};

const processContract = async (contractId, file) => {
  try {
    console.log(`⏳ Processing contract ${contractId}...`);
    const rawText = await extractText(file);
    await Contract.findByIdAndUpdate(contractId, { rawText });

    console.log('🤖 Sending to AI...');
    const analysis  = await analyzeContract(rawText);
    const deadlines = processDeadlines(analysis.deadlines);

    await Contract.findByIdAndUpdate(contractId, {
      status:    'done',
      riskScore: analysis.riskScore,
      summary:   analysis.summary,
      clauses:   analysis.clauses,
      deadlines,
    });

    console.log(`✅ Contract ${contractId} analyzed successfully`);
  } catch (error) {
    await Contract.findByIdAndUpdate(contractId, {
      status:       'error',
      errorMessage: error.message,
    });
    console.error(`❌ Contract ${contractId} failed:`, error.message);
  }
};

const getContracts = async (req, res) => {
  const contracts = await Contract.find({ userId: req.user._id })
    .select('-rawText -clauses')
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count:   contracts.length,
    data:    contracts,
  });
};

const getContract = async (req, res) => {
  const contract = await Contract.findOne({
    _id:    req.params.id,
    userId: req.user._id,
  });
  if (!contract)
    return res.status(404).json({ message: 'Contract not found' });
  res.status(200).json({ success: true, data: contract });
};

const deleteContract = async (req, res) => {
  const contract = await Contract.findOneAndDelete({
    _id:    req.params.id,
    userId: req.user._id,
  });
  if (!contract)
    return res.status(404).json({ message: 'Contract not found' });
  res.status(200).json({ success: true, message: 'Contract deleted successfully' });
};

module.exports = {
  uploadContract,
  getContracts,
  getContract,
  deleteContract,
};