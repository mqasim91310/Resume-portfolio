const express = require('express');
const { body } = require('express-validator');
const {
    getProjects, getProject, createProject, updateProject, removeProjectImage, deleteProject,
} = require('../controllers/projectsController');
const { protect } = require('../middleware/auth');
const { uploadProjectImages } = require('../middleware/upload');
const validate = require('../middleware/validate');

const router = express.Router();

const projectValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('technologies').notEmpty().withMessage('Technologies are required'),
];

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, uploadProjectImages, projectValidation, validate, createProject);
router.put('/:id', protect, uploadProjectImages, updateProject);
router.delete('/:id/images/:imageIndex', protect, removeProjectImage);
router.delete('/:id', protect, deleteProject);

module.exports = router;
