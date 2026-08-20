const express = require('express');
const { getAbout, updateAbout, updateResume } = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');
const { uploadProfileImage, uploadResume } = require('../middleware/upload');

const router = express.Router();

router.get('/', getAbout);
router.put('/', protect, uploadProfileImage, updateAbout);
router.put('/resume', protect, uploadResume, updateResume);

module.exports = router;
