import mongoose from 'mongoose';

// ─── Sub-schema: Single Clause ──────────────────────
const clauseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  risk: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
});

// ─── Sub-schema: Single Deadline ────────────────────
const deadlineSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  daysRemaining: {
    type: Number,
    default: 0,
  },
});

// ─── Main Contract Schema ────────────────────────────
const contractSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number, // stored in bytes
      default: 0,
    },
    rawText: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['analyzing', 'done', 'error'],
      default: 'analyzing',
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    summary: {
      type: String,
      default: '',
    },
    clauses: [clauseSchema],
    deadlines: [deadlineSchema],
    errorMessage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export default mongoose.model('Contract', contractSchema);