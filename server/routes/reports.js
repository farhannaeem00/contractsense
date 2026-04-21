import express from 'express';
import { protect } from '../middleware/auth.js';
import Contract from '../models/Contract.js';
import { generateReport } from '../services/generateReport.js';

const router = express.Router();

router.get('/:id', protect, async (req, res) => {
  const contract = await Contract.findOne({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!contract) {
    return res.status(404).json({ message: 'Contract not found' });
  }

  if (contract.status !== 'done') {
    return res.status(400).json({ message: 'Contract analysis not complete yet' });
  }

  generateReport(contract, res);
});

export default router;