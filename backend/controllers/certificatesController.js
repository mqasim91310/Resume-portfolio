const asyncHandler = require('express-async-handler');
const Certificate = require('../models/Certificate');
const ApiError = require('../utils/ApiError');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = asyncHandler(async (req, res) => {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.status(200).json({ success: true, count: certificates.length, data: certificates });
});

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Public
const getCertificate = asyncHandler(async (req, res) => {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) throw new ApiError(404, 'Certificate not found');
    res.status(200).json({ success: true, data: certificate });
});

// @desc    Create certificate
// @route   POST /api/certificates
// @access  Private
const createCertificate = asyncHandler(async (req, res) => {
    const data = { ...req.body };
    if (req.file) data.certificateImage = `/uploads/certificates/${req.file.filename}`;
    const certificate = await Certificate.create(data);
    res.status(201).json({ success: true, message: 'Certificate created', data: certificate });
});

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private
const updateCertificate = asyncHandler(async (req, res) => {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) throw new ApiError(404, 'Certificate not found');

    Object.assign(certificate, req.body);
    if (req.file) certificate.certificateImage = `/uploads/certificates/${req.file.filename}`;

    await certificate.save();
    res.status(200).json({ success: true, message: 'Certificate updated', data: certificate });
});

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private
const deleteCertificate = asyncHandler(async (req, res) => {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) throw new ApiError(404, 'Certificate not found');
    res.status(200).json({ success: true, message: 'Certificate deleted' });
});

module.exports = { getCertificates, getCertificate, createCertificate, updateCertificate, deleteCertificate };
