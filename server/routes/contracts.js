const express  = require('express');
const { protect } = require('../middleware/auth');
const { upload }  = require('../middleware/upload');
const {
  uploadContract,
  getContracts,
  getContract,
  deleteContract,
} = require('../controllers/contractController');

const router = express.Router();

router.use(protect);

router.post('/',      upload.single('contract'), uploadContract);
router.get('/',       getContracts);
router.get('/:id',    getContract);
router.delete('/:id', deleteContract);

module.exports = router;