const express = require('express');
const { getStatistics, updateStatistics } = require('../controllers/statisticsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getStatistics);
router.put('/', protect, updateStatistics);

module.exports = router;
