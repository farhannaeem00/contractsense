const express  = require('express');
const { protect }        = require('../middleware/auth');
const Contract           = require('../models/Contract');
const { generateReport } = require('../services/generateReport');

const router = express.Router();

router.get('/:id', protect, async (req, res) => {
  const contract = await Contract.findOne({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!contract)
    return res.status(404).json({ message: 'Contract not found' });

  if (contract.status !== 'done')
    return res.status(400).json({ message: 'Contract analysis not complete yet' });

  generateReport(contract, res);
});

module.exports = router;