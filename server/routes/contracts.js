const express  = require('express');
const { protect }       = require('../middleware/auth');
const { upload }        = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');
const {
  uploadContract,
  getContracts,
  getContract,
  deleteContract,
} = require('../controllers/contractController');

const router = express.Router();

router.use(protect);

router.post('/',      uploadLimiter, upload.single('contract'), uploadContract);
router.get('/',       getContracts);
router.get('/:id',    getContract);
router.delete('/:id', deleteContract);

module.exports = router;