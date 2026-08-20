const express = require('express');
const { body } = require('express-validator');
const {
    getCertificates, getCertificate, createCertificate, updateCertificate, deleteCertificate,
} = require('../controllers/certificatesController');
const { protect } = require('../middleware/auth');
const { uploadCertificateImage } = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

const certValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('organization').notEmpty().withMessage('Organization is required'),
    body('issueDate').notEmpty().withMessage('Issue date is required'),
];

router.get('/', getCertificates);
router.get('/:id', getCertificate);
router.post('/', protect, uploadCertificateImage, certValidation, validate, createCertificate);
router.put('/:id', protect, uploadCertificateImage, updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;
