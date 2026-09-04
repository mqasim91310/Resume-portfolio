const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');
const ApiError = require('../utils/ApiError');

// @desc    Get all projects (supports ?category=, ?semester=, ?featured=)
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.category && req.query.category !== 'all') filter.category = req.query.category;
    if (req.query.semester) filter.semester = Number(req.query.semester);
    if (req.query.featured) filter.featured = req.query.featured === 'true';
    if (req.query.status) filter.status = req.query.status;

    const projects = await Project.find(filter).sort({ createdDate: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, 'Project not found');
    res.status(200).json({ success: true, data: project });
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
    const images = (req.files || []).map((f) => `/uploads/projects/${f.filename}`);
    const project = await Project.create({ ...req.body, images });
    res.status(201).json({ success: true, message: 'Project created', data: project });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, 'Project not found');

    Object.assign(project, req.body);

    if (req.files && req.files.length > 0) {
        const newImages = req.files.map((f) => `/uploads/projects/${f.filename}`);
        project.images = [...project.images, ...newImages];
    }

    await project.save();
    res.status(200).json({ success: true, message: 'Project updated', data: project });
});

// @desc    Remove a single existing image from a project
// @route   DELETE /api/projects/:id/images/:imageIndex
// @access  Private
const removeProjectImage = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, 'Project not found');

    const index = Number(req.params.imageIndex);
    if (!Number.isInteger(index) || index < 0 || index >= project.images.length) {
        throw new ApiError(400, 'Invalid image index');
    }

    const [removedPath] = project.images.splice(index, 1);
    await project.save();

    if (removedPath) {
        const fullPath = path.join(__dirname, '..', removedPath.replace(/^\/uploads/, 'uploads'));
        fs.unlink(fullPath, () => {}); // best-effort cleanup, ignore errors
    }

    res.status(200).json({ success: true, message: 'Image removed', data: project });
});

// @desc    Delete project (also removes its uploaded image files)
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, 'Project not found');

    (project.images || []).forEach((imgPath) => {
        const fullPath = path.join(__dirname, '..', imgPath.replace(/^\/uploads/, 'uploads'));
        fs.unlink(fullPath, () => {}); // best-effort cleanup, ignore errors
    });

    await project.deleteOne();
    res.status(200).json({ success: true, message: 'Project deleted' });
});

module.exports = {
    getProjects, getProject, createProject, updateProject, removeProjectImage, deleteProject,
};
