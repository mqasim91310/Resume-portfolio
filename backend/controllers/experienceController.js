const Experience = require('../models/Experience');
const createCrudController = require('../utils/createCrudController');

module.exports = createCrudController(Experience, 'Experience entry');
