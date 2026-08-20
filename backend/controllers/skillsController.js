const Skill = require('../models/Skill');
const createCrudController = require('../utils/createCrudController');

module.exports = createCrudController(Skill, 'Skill');
