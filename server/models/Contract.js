const mongoose = require('mongoose');

const clauseSchema = new mongoose.Schema({
  title:       String,
  text:        String,
  risk:        { type: String, enum: ['low', 'medium', 'high'] },
  explanation: String,
  suggestion:  String,
});

const deadlineSchema = new mongoose.Schema({
  label:         String,
  date:          String,
  daysRemaining: Number,
  status:        String,
});

const contractSchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileName:     { type: String, required: true },
    fileSize:     { type: Number, default: 0 },
    rawText:      { type: String, default: '' },
    status:       { type: String, enum: ['analyzing', 'done', 'error'], default: 'analyzing' },
    riskScore:    { type: Number, min: 0, max: 100, default: null },
    summary:      { type: String, default: '' },
    clauses:      [clauseSchema],
    deadlines:    [deadlineSchema],
    errorMessage: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contract', contractSchema);