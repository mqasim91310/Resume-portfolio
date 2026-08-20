const Education = require('../models/Education');
const createCrudController = require('../utils/createCrudController');

module.exports = createCrudController(Education, 'Education entry');
