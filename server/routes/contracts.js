import express from 'express';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  uploadContract,
  getContracts,
  getContract,
  deleteContract,
} from '../controllers/contractController.js';

const router = express.Router();

// All contract routes require authentication
router.use(protect);

router.post('/',     upload.single('contract'), uploadContract);
router.get('/',      getContracts);
router.get('/:id',   getContract);
router.delete('/:id', deleteContract);

export default router;